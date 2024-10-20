import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';
import ResetBtn from '@/components/client/ResetBtn';
import Page from '@/components/server/Page';
import OrderingSwitch from '@/components/client/OrderingSwitch';
import { fetchFoodDB, fetchMainDB } from '@/utils/db';
import MenuLinks from '@/components/server/MenuLinks';
import OrderTable from '@/components/server/OrderTable';
import Buses from '@/components/server/Buses';
import MessageField from '@/components/client/MessageField';
import { updateFoodMsg } from '../food/actions';
import Panel from '@/components/server/Panel';
import { updateMainMsg } from './actions';

export type AdminPageProps = object;

const AdminPage: React.FC<AdminPageProps> = async ({}) => {
	const { adminToken } = await auth();

	if (adminToken !== process.env.TOKEN) {
		redirect('/login');
	}

	const mainDB = await fetchMainDB();
	const foodDB = await fetchFoodDB();

	return (
		<Page>
			<Panel className="mb-2 ">
				<Typography color="primary" variant="overline" fontSize={18} textAlign="center">
					Main
				</Typography>
				<MessageField db={mainDB} onChange={updateMainMsg} />
			</Panel>
			<Panel className="p-2 mb-2">
				<Typography color="primary" variant="overline" fontSize={18} textAlign="center">
					Food
				</Typography>
				<Stack spacing={2}>
					<MessageField db={foodDB} onChange={updateFoodMsg} />
					<OrderingSwitch checked={foodDB.open} />
					<MenuLinks />
				</Stack>
			</Panel>
			{foodDB.orders.length > 0 && (
				<div className="mb-2">
					<OrderTable orders={foodDB.orders} />
				</div>
			)}
			<Panel className="p-2 mb-2">
				<Typography color="primary" variant="overline" fontSize={18} textAlign="center">
					Bus Stock
				</Typography>
				<Buses />
			</Panel>
			<Panel className="p-2">
				<Typography color="error" variant="overline" fontSize={18} textAlign="center">
					DANGER ZONE
				</Typography>
				<ResetBtn />
			</Panel>
		</Page>
	);
};

export default AdminPage;
