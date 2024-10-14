import Panel from '@/components/lib/Panel';
import Page from '@/components/Page';
import { getTokens } from '@/utils/cookies';
import { fetchFoodDB } from '@/utils/db';
import * as React from 'react';

export type FoodPageProps = {};

const FoodPage: React.FC<FoodPageProps> = async ({}) => {
	const { sessionId } = getTokens();

	const db = await fetchFoodDB();

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

	const orders = db.orders.filter((o) => o.user.id === sessionId);

	return (
		<Page>
			<Panel>
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
			</Panel>
			{/* <SiteIframe db={db} canFrameSite={canFrameSite} /> */}
		</Page>
	);
};

export default FoodPage;
