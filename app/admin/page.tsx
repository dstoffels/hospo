import * as React from 'react';
import { Paper, Stack } from '@mui/material';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';
import ResetBtn from '@/components/lib/ResetBtn';
import Page from '@/components/Page';
import OrderingSwitch from '@/components/lib/OrderingSwitch';
import { fetchFoodDB } from '@/utils/db';
import MenuLinks from '@/components/MenuLinks';

export type AdminPageProps = object;

const AdminPage: React.FC<AdminPageProps> = async ({}) => {
	const { adminToken } = await auth();

	if (adminToken !== process.env.TOKEN) {
		redirect('/login');
	}

	const db = await fetchFoodDB();

	return (
		<Page>
			<div className="flex my-3">
				<Paper className="p-2 w-full">
					<Stack spacing={2}>
						<OrderingSwitch checked={db.open} />
						<MenuLinks />
						{/* <LinkSwitch db={db} /> */}
						{/* <MenuLinkField db={db} /> */}
						{/* <MessageField db={db} /> */}
					</Stack>
				</Paper>
			</div>
			{/* <OrderTable orders={db.orders} heading="Orders" /> */}
			<ResetBtn />
		</Page>
	);
};

export default AdminPage;
