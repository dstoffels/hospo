import { cookies } from 'next/headers';
import { fetchMainDB } from './db';

/**
 * Can only be used in server components
 */
export const auth = async () => {
	'use server';

	const cookieStore = cookies();
	const sessionId = cookieStore.get('session')?.value as string;
	const adminToken = cookieStore.get('admin')?.value;

	const db = await fetchMainDB();
	const user = db.users.find(({ sessions }) => sessions.includes(sessionId)) || null;

	return { sessionId, adminToken, user };
};
