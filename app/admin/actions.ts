'use server';

import { revalidatePath } from 'next/cache';
import { fetchDB, setDB } from '../actions';
import { Order } from '../types';

export async function completeOrder(order: Order) {
	const db = await fetchDB();

	const i = db.orders.findIndex(({ id }) => id === order.id);

	db.orders[i].completed = !db.orders[i].completed;

	await setDB(db);
	revalidatePath('');
}

export async function updateMenuLink(menuLink: string) {
	const db = await fetchDB();

	db.menu_link = menuLink;

	await setDB(db);
	revalidatePath('');
}

export async function updateMsg(message: string) {
	const db = await fetchDB();

	db.message = message;

	await setDB(db);
	revalidatePath('');
}

export async function toggleOpen() {
	const db = await fetchDB();

	db.open = !db.open;
	await setDB(db);
	revalidatePath('');
}

export async function toggleLink() {
	const db = await fetchDB();

	db.useLink = !db.useLink;
	await setDB(db);
	revalidatePath('');
}

export async function resetDB() {
	const db = await fetchDB();
	db.orders = [];
	await setDB(db);
	revalidatePath('');
}
