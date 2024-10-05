import { getTokens } from '@/utils/cookies';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as React from 'react';

export type LoginPageProps = object;

const LoginPage: React.FC<LoginPageProps> = async ({}) => {
	const { adminToken } = getTokens();

	if (adminToken === process.env.TOKEN) redirect('/admin');

	const handleLogin = async (formData: FormData) => {
		'use server';
		const password = formData.get('password');
		if (password === process.env.ADMIN_PW) {
			const cookieStore = cookies();
			cookieStore.set('admin', process.env.TOKEN as string, {
				maxAge: 60 * 60 * 24 * 365 * 100, // 100 year token
				path: '/',
			});
			redirect('/admin');
		}
	};

	return (
		<div className="p-2 flex-grow flex flex-col justify-center">
			<Paper component={'form'} action={handleLogin} className="p-3 flex flex-col space-y-2">
				<Typography variant="h5">Admin Login</Typography>
				<TextField fullWidth name="password" label="Enter Password" />
				<div className="flex justify-end">
					<Button type="submit">Login</Button>
				</div>
			</Paper>
		</div>
	);
};

export default LoginPage;
