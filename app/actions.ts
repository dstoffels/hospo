'use server';

import { revalidatePath } from 'next/cache';
import { Order, User } from './types';
import { fetchFoodDB, fetchMainDB, setDB } from '@/utils/db';

export async function setUser(user: User, sessionId: string) {
	const db = await fetchMainDB();

	// clear sessionId from all users
	db.users.forEach(({ sessions }) => {
		const i = sessions.findIndex((sid) => sid === sessionId);
		if (i > -1) sessions.splice(i, 1);
	});

	const i = db.users.findIndex(({ id }) => id === user.id);

	if (i > -1) db.users[i] = user;
	else db.users.push(user);

	await setDB('main', db);

	revalidatePath('');
}

export async function placeOrder(order: Order) {
	const db = await fetchFoodDB();
	db.orders.push(order);
	await setDB('food', db);
	revalidatePath('');
}

export async function updateOrder(order: Order) {
	const db = await fetchFoodDB();
	const i = db.orders.findIndex(({ id }) => id === order.id);
	db.orders[i] = order;
	await setDB('food', db);
	revalidatePath('');
}

export async function deleteOrder(order: Order) {
	const db = await fetchFoodDB();
	const i = db.orders.findIndex(({ id }) => id === order.id);
	db.orders.splice(i, 1);
	await setDB('food', db);
	revalidatePath('');
}

export async function fulfillOrder(order: Order) {
	const db = await fetchFoodDB();
	const i = db.orders.findIndex(({ id }) => id === order.id);
	db.orders[i].fulfilled = !db.orders[i].fulfilled;
	await setDB('food', db);
	revalidatePath('');
}
