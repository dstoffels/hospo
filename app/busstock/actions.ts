'use server';

import { fetchBusDB, setDB } from '@/utils/db';
import { Bus, BusStockDB, StockItemType } from '../types';
import { revalidatePath } from 'next/cache';
import { v4 } from 'uuid';

export async function addBus() {
	await dbSetter((db) => {
		db.buses.push({ id: v4(), name: '', stock: [] } as Bus);
	});
}

export async function updateBus(bus: Bus, i: number) {
	await dbSetter((db) => {
		db.buses[i] = bus;
	});
}

export async function deleteBus(i: number) {
	await dbSetter((db) => {
		db.buses.splice(i, 1);
	});
}

export async function addStock(busId: string, item: StockItemType) {
	await dbSetter((db) => {
		const i = db.buses.findIndex(({ id }) => id === busId);
		db.buses[i].stock.push(item);
	});
}

export async function updateStock(busId: string, item: StockItemType) {
	await dbSetter((db) => {
		const i = db.buses.findIndex(({ id }) => id === busId);
		const j = db.buses[i].stock.findIndex(({ id }) => id === item.id);
		db.buses[i].stock[j] = item;
	});
}

export async function deleteStock(stockId: string) {
	await dbSetter((db) => {
		const allStock = getAllStock(db.buses);
		const i = allStock.findIndex(({ id }) => id === stockId);
		db.buses[i].stock.splice(i, 1);
	});
}

async function dbSetter(cb: (db: BusStockDB) => void) {
	const db = await fetchBusDB();
	cb(db);
	await setDB('busstock', db);
	revalidatePath('');
}

function getAllStock(buses: Bus[]) {
	let allStock: StockItemType[] = [];
	buses.forEach(({ stock }) => (allStock = [...allStock, ...stock]));
	return allStock;
}
