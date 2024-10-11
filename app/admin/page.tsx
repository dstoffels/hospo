import * as React from 'react';
import { fetchDB } from '../actions';
import { Paper, Stack } from '@mui/material';
import { getTokens } from '@/utils/cookies';
import { redirect } from 'next/navigation';
import OrderTable from '@/components/OrderTable';
import MenuLinkField from '@/components/lib/MenuLinkField';
import ResetBtn from '@/components/lib/ResetBtn';
import MessageField from '@/components/lib/MessageField';
import OpenSwitch from '@/components/lib/OpenSwitch';
import Page from '@/components/Page';

export type AdminPageProps = object;

const AdminPage: React.FC<AdminPageProps> = async ({}) => {
	const { adminToken } = getTokens();

	if (adminToken !== process.env.TOKEN) {
		redirect('/login');
	}

	const db = await fetchDB();

	return (
		<Page>
			<div className="flex my-3">
				<Paper className="p-2 w-full">
					<Stack spacing={2}>
						<OpenSwitch db={db} />
						<MenuLinkField db={db} />
						<MessageField db={db} />
					</Stack>
				</Paper>
			</div>
			<OrderTable orders={db.orders} heading="Orders" />
			<ResetBtn />
		</Page>
	);
};

export default AdminPage;
