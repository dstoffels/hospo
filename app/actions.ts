'use server';

import { revalidatePath } from 'next/cache';
import { MainDB, User } from './types';
import { fetchMainDB, setDB } from '@/utils/db';

export async function setUser(user: User, sessionId: string) {
	await mainDbSetter((db) => {
		// clear sessionId from all users
		db.users.forEach(({ sessions }) => {
			const i = sessions.findIndex((sid) => sid === sessionId);
			if (i > -1) sessions.splice(i, 1);
		});

		const i = db.users.findIndex(({ id }) => id === user.id);

		if (i > -1) db.users[i] = user;
		else db.users.push(user);
	});
}

export async function setUserBus(user: User, busId: string) {
	await mainDbSetter((db) => {
		const i = db.users.findIndex(({ id }) => id === user.id);
		db.users[i].busId = busId;
	});
}

async function mainDbSetter(cb: (db: MainDB) => void) {
	const db = await fetchMainDB();
	cb(db);

	await setDB('main', db);
	revalidatePath('');
}
