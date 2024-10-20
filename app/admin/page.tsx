import * as React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';
import ResetBtn from '@/components/client/ResetBtn';
import Page from '@/components/server/Page';
import OrderingSwitch from '@/components/client/OrderingSwitch';
import { fetchFoodDB } from '@/utils/db';
import MenuLinks from '@/components/server/MenuLinks';
import OrderTable from '@/components/server/OrderTable';
import Buses from '@/components/server/Buses';
import MessageField from '@/components/client/MessageField';
import { updateFoodMsg } from '../food/actions';

export type AdminPageProps = object;

const AdminPage: React.FC<AdminPageProps> = async ({}) => {
	const { adminToken } = await auth();

	if (adminToken !== process.env.TOKEN) {
		redirect('/login');
	}

	const db = await fetchFoodDB();

	return (
		<Page>
			<Paper className="p-2 mb-2">
				<Typography color="primary" variant="overline" fontSize={18} textAlign="center">
					Food
				</Typography>
				<Stack spacing={2}>
					<OrderingSwitch checked={db.open} />
					<MenuLinks />
					<MessageField db={db} onChange={updateFoodMsg} />
				</Stack>
			</Paper>
			{db.orders.length > 0 && (
				<div className="mb-2">
					<OrderTable orders={db.orders} />
				</div>
			)}
			<Paper className="p-2 mb-2">
				<Typography color="primary" variant="overline" fontSize={18} textAlign="center">
					Bus Stock
				</Typography>
				<Buses />
			</Paper>
			<Paper className="p-2">
				<Typography color="error" variant="overline" fontSize={18} textAlign="center">
					DANGER ZONE
				</Typography>
				<ResetBtn />
			</Paper>
		</Page>
	);
};

export default AdminPage;
