import { NextRequest, NextResponse } from 'next/server';
import { v4 } from 'uuid';

export function middleware(req: NextRequest) {
	const sessionCookie = req.cookies.get('session');

	const res = NextResponse.next();
	if (!sessionCookie) {
		const token = v4();
		res.cookies.set('session', token, {
			maxAge: 60 * 60 * 24 * 365 * 100, // 100 year token
			path: '/',
		});
	}

	return res;
}
