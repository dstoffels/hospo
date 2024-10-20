'use server';

import { Order } from '../types';
import { setFoodDB } from '../admin/actions';

export async function updateFoodMsg(message: string) {
	await setFoodDB((db) => (db.message = message));
}

export async function placeOrder(order: Order) {
	await setFoodDB((db) => db.orders.push(order));
}

export async function updateOrder(order: Order) {
	await setFoodDB((db) => {
		const i = db.orders.findIndex(({ id }) => id === order.id);
		db.orders[i] = order;
	});
}

export async function deleteOrder(order: Order) {
	await setFoodDB((db) => {
		const i = db.orders.findIndex(({ id }) => id === order.id);
		db.orders.splice(i, 1);
	});
}

export async function fulfillOrder(order: Order) {
	await setFoodDB((db) => {
		const i = db.orders.findIndex(({ id }) => id === order.id);
		db.orders[i].fulfilled = !db.orders[i].fulfilled;
	});
}
