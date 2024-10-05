'use server';

import { revalidatePath } from 'next/cache';
import { DB } from './types';

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { v4 } from 'uuid';

export async function fetchDB() {
	const c = collection(db, 'aftershow');

	try {
		const snap = await getDocs(c);
		const dataDoc = snap.docs[0];

		// Auto init db
		if (!dataDoc) {
			await addDoc(c, { menu_link: '', orders: [] });
			return await fetchDB();
		}

		return { ...dataDoc.data(), id: dataDoc.id } as DB;
	} catch (error) {
		return await fetchDB();
	}
}

export async function setDB(rawDB: DB) {
	const dataDoc = doc(db, `aftershow/${rawDB.id}`);
	await updateDoc(dataDoc, rawDB);
	// await fetchDB();
	revalidatePath('');
}

// export async function resetDB() {
// 	const rawDB = await fetchDB();
// 	const dataDoc = doc(db, `db/${rawDB.id}`);
// 	await deleteDoc(dataDoc);
// 	await fetchDB();
// 	revalidatePath('');
// }

export async function refresh() {
	revalidatePath('', 'page');
}

export async function submitOrder(formData: FormData) {
	const name = formData.get('name') as string;
	const order = formData.get('order') as string;
	const token = formData.get('token') as string;
	const id = formData.get('id') as string;

	const db = await fetchDB();

	const i = db.orders.findIndex((order) => order.id === id);
	const newOrder = { name, order, token, completed: false, id: v4() };

	if (i > -1) db.orders[i] = newOrder;
	else db.orders.push(newOrder);

	await setDB(db);
	revalidatePath('');
}

export async function deleteOrder(orderId: string) {
	const db = await fetchDB();

	const i = db.orders.findIndex((o) => o.id === orderId);

	db.orders.splice(i, 1);

	await setDB(db);
	revalidatePath('');
}
