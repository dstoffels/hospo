'use server';

import { revalidatePath } from 'next/cache';
import { User } from './types';
import { fetchMainDB, setDB } from '@/utils/db';
// import { DB, FoodDB } from './types';
// import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
// import { db } from '@/firebaseConfig';
// import { v4 } from 'uuid';

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

	revalidatePath('', 'layout');
}

// export async function fetchDB(docId: 'food' | 'busstock') {
// 	const c = collection(db, 'ek-hospice');
// 	const d = doc(c, docId);

// 	const snap = await getDoc(d);

// 	switch (docId) {
// 		case 'food':
// 			return snap.data() as FoodDB;
// 		case 'busstock':
// 			return snap.data() as
// 	}

// 	try {
// 		const snap = await getDocs(c);
// 		const dataDoc = snap.docs[0];

// 		// Auto init db
// 		if (!dataDoc) {
// 			await addDoc(c, { menu_link: '', orders: [], message: '', open: false });
// 			return await fetchDB();
// 		}

// 		return { ...dataDoc.data(), id: dataDoc.id } as DB;
// 	} catch {
// 		return await fetchDB();
// 	}
// }

// export async function setDB(rawDB: DB) {
// 	const dataDoc = doc(db, `aftershow/${rawDB.id}`);
// 	await updateDoc(dataDoc, rawDB);
// 	await fetchDB();
// 	revalidatePath('', 'layout');
// }

// // export async function resetDB() {
// // 	const rawDB = await fetchDB();
// // 	const dataDoc = doc(db, `db/${rawDB.id}`);
// // 	await deleteDoc(dataDoc);
// // 	await fetchDB();
// // 	revalidatePath('');
// // }

// export async function refresh() {
// 	revalidatePath('', 'page');
// }

// export async function submitOrder(formData: FormData) {
// 	const name = formData.get('name') as string;
// 	const order = formData.get('order') as string;
// 	const sessionId = formData.get('token') as string;
// 	const id = (formData.get('id') as string) || v4();

// 	const db = await fetchDB();

// 	const i = db.orders.findIndex((order) => order.id === id);
// 	const newOrder = { name, order, sessionId, completed: false, id };

// 	if (i > -1) db.orders[i] = newOrder;
// 	else db.orders.push(newOrder);

// 	await setDB(db);
// 	await fetchDB();
// 	revalidatePath('');
// }

// export async function deleteOrder(orderId: string) {
// 	const db = await fetchDB();

// 	const i = db.orders.findIndex((o) => o.id === orderId);

// 	db.orders.splice(i, 1);

// 	await setDB(db);
// 	revalidatePath('');
// }
