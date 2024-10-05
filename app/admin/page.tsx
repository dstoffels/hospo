import * as React from 'react';
import { fetchDB } from '../actions';
import { Button, Paper, Stack, TextField } from '@mui/material';
import { getTokens } from '@/utils/cookies';
import { redirect } from 'next/navigation';
import OrderTable from '@/components/OrderTable';
import MenuLinkField from '@/components/MenuLinkField';
import ResetBtn from '@/components/ResetBtn';

export type AdminPageProps = {};

const AdminPage: React.FC<AdminPageProps> = async ({}) => {
	const { adminToken } = getTokens();

	if (adminToken !== process.env.TOKEN) {
		redirect('/login');
	}

	const db = await fetchDB();

	return (
		<div className="flex-grow flex-col flex p-2">
			<div className="flex my-3">
				<Paper className="p-2 w-full">
					<Stack spacing={2}>
						<MenuLinkField db={db} />
					</Stack>
				</Paper>
			</div>
			<OrderTable orders={db.orders} heading="Orders" />
			<ResetBtn />
		</div>
	);
};

export default AdminPage;
