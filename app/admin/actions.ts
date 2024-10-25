'use server';

import { revalidatePath } from 'next/cache';
import { FoodDB, MenuLinkType } from '../types';
import { fetchFoodDB, fetchMainDB, setDB } from '@/utils/db';
import * as cheerio from 'cheerio';

export async function updateMainMsg(message: string) {
	const db = await fetchMainDB();
	db.message = message;
	setDB('main', db);
	revalidatePath('');
}

export async function toggleOrdering() {
	await setFoodDB((db) => (db.open = !db.open));
}

export async function newMenuLink() {
	await setFoodDB((db) =>
		db.menuLinks.push({
			url: '',
			useIframe: true,
			title: '',
			description: '',
			thumbnail: '',
			favicon: '',
			meal: 'Aftershow',
		} as MenuLinkType),
	);
}

export async function updateMenuLink(menuLink: MenuLinkType, i: number) {
	await setFoodDB(async (db) => {
		if (!menuLink.title || menuLink.url !== db.menuLinks[i].url) {
			const meta = await fetchMeta(menuLink.url);
			menuLink = { ...menuLink, ...meta };
			console.log(menuLink);
		}

		if (!menuLink.title) menuLink.title = menuLink.url;

		db.menuLinks[i] = menuLink;
	});
}

export async function deleteMenuLink(i: number) {
	await setFoodDB((db) => db.menuLinks.splice(i, 1));
}

export async function resetFoodOrders() {
	await setFoodDB((db) => (db.orders = []));
}

export async function setFoodDB(cb: (db: FoodDB) => void) {
	const db = await fetchFoodDB();
	await cb(db);
	await setDB('food', db);
	revalidatePath('');
}

async function fetchMeta(url: string) {
	try {
		const response = await fetch(url);
		const html = await response.text();

		const $ = cheerio.load(html);

		const title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
		const description = $('meta[property="og:description"]').attr('content') || '';
		const thumbnail = $('meta[property=og:image]').attr('content') || '';

		// Extract favicon
		let favicon =
			$('link[rel="icon"]').attr('href') ||
			$('link[rel="shortcut icon"]').attr('href') ||
			$('link[rel="apple-touch-icon"]').attr('href') ||
			'';

		// Ensure absolute URL for the favicon if it’s relative
		if (favicon && !favicon.startsWith('http')) {
			const baseUrl = new URL(url).origin;
			favicon = baseUrl + favicon;
		}

		return { title, description, thumbnail, favicon };
	} catch {
		return { url, title: '', description: '', thumbnail: '', favicon: '' };
	}
}
