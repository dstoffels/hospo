import Panel from '@/components/lib/Panel';
import OrderForm from '@/components/OrderForm';
import Page from '@/components/Page';
import SiteIframe from '@/components/SiteIframe';
import { auth } from '@/utils/auth';
import { fetchFoodDB, fetchMainDB } from '@/utils/db';
import * as React from 'react';
import { User } from '../types';

export type FoodPageProps = {};

const FoodPage: React.FC<FoodPageProps> = async ({}) => {
	const { sessionId, user } = await auth();

	const foodDB = await fetchFoodDB();
	const mainDB = await fetchMainDB();
	// const validateIframe = async () => {
	// 	'use server';

	// 	if (db.menuLinks.length > -1) {
	// 		try {
	// 			const res = await fetch(db.menu_link, { method: 'HEAD' });
	// 			return !Boolean(res.headers.get('content-security-policy')?.includes('frame-ancestors'));
	// 		} catch (error) {
	// 			console.log('fetch error', error);
	// 			return false;
	// 		}
	// 	}
	// 	return false;
	// };

	// const canFrameSite = await validateIframe();

	const orders = foodDB.orders.filter((o) => o.user.id === user?.id);

	return (
		<Page>
			{/* <Stack spacing={1}>
        {db.menu_link && db.open && (
            <>
			<OrderTable heading="My Items" orders={orders} />
			<OrderModal btnTxt="Add Order" token={sessionId as string}>
			<Button variant="contained" color="primary" size="large" className="w-full">
			<span>Add Your Order </span>
			<Add />
			</Button>
			</OrderModal>
            </>
			)}
			{db.message && (
				<Typography variant="body1" fontWeight={600} color="error">
                {db.message}
				</Typography>
				)}
				</Stack> */}
			<SiteIframe menuLinks={foodDB.menuLinks} />
			<OrderForm user={user as User} users={mainDB.users} sessionId={sessionId} />
		</Page>
	);
};

export default FoodPage;
