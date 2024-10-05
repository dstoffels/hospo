import { cookies } from 'next/headers';

/**
 * Can only be used in server components
 */
export const getTokens = () => {
	const cookieStore = cookies();
	const sessionId = cookieStore.get('session')?.value as string;
	const adminToken = cookieStore.get('admin')?.value;

	return { sessionId, adminToken };
};
