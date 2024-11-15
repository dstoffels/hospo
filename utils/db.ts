'use server';

import { BusStockDB, DBname, FoodDB, MainDB } from '@/app/types';
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function fetchDB(dbName: DBname) {
	const d = doc(db, `ek-hospice/${dbName}`);
	const snap = await getDoc(d);
	const data = snap.data();

	switch (dbName) {
		case 'food':
			return data as FoodDB;
		case 'busstock':
			return data as BusStockDB;
		case 'main':
			return data as MainDB;
	}
}

export async function fetchMainDB() {
	return (await fetchDB('main')) as MainDB;
}

export async function fetchFoodDB() {
	return (await fetchDB('food')) as FoodDB;
}
export async function fetchBusDB() {
	return (await fetchDB('busstock')) as BusStockDB;
}

export async function setDB(dbName: DBname, rawDB: FoodDB | BusStockDB | MainDB) {
	const docRef = doc(db, `ek-hospice/${dbName}`);
	await setDoc(docRef, rawDB);
}
