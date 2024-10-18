'use server';

import { revalidatePath } from 'next/cache';
import { MenuLinkType } from '../types';
import { fetchFoodDB, setDB } from '@/utils/db';
import * as cheerio from 'cheerio';

// export async function completeOrder(order: Order) {
// 	const db = await fetchDB();

// 	const i = db.orders.findIndex(({ id }) => id === order.id);

// 	db.orders[i].completed = !db.orders[i].completed;

// 	await setDB(db);
// 	revalidatePath('');
// }

// export async function updateMsg(message: string) {
// 	const db = await fetchDB();

// 	db.message = message;

// 	await setDB(db);
// 	revalidatePath('');
// }

export async function toggleOrdering() {
	const db = await fetchFoodDB();

	db.open = !db.open;
	await setDB('food', db);
	revalidatePath('');
}

export async function newMenuLink() {
	const db = await fetchFoodDB();
	db.menuLinks.push({
		url: '',
		useIframe: true,
		title: '',
		description: '',
		thumbnail: '',
		favicon: '',
	});
	await setDB('food', db);
	revalidatePath('');
}

export async function updateMenuLink(menuLink: MenuLinkType, i: number) {
	const db = await fetchFoodDB();

	if (!menuLink.title || menuLink.url !== db.menuLinks[i].url) {
		const meta = await fetchMeta(menuLink.url);
		menuLink = { ...menuLink, ...meta };
	}

	if (!menuLink.title) menuLink.title = menuLink.url;

	db.menuLinks[i] = menuLink;
	await setDB('food', db);
	revalidatePath('');
}

export async function deleteMenuLink(i: number) {
	const db = await fetchFoodDB();
	db.menuLinks.splice(i, 1);
	await setDB('food', db);
	revalidatePath('');
}

// export async function toggleLink() {
// 	const db = await fetchDB();

// 	db.useLink = !db.useLink;
// 	await setDB(db);
// 	revalidatePath('');
// }

// export async function resetDB() {
// 	const db = await fetchDB();
// 	db.orders = [];
// 	await setDB(db);
// 	revalidatePath('');
// }

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
		return { title: '', description: '', thumbnail: '', favicon: '' };
	}
}
