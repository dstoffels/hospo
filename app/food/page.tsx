import OrderForm from '@/components/client/OrderForm';
import Page from '@/components/server/Page';
import SiteIframe from '@/components/client/SiteIframe';
import { auth } from '@/utils/auth';
import { fetchFoodDB, fetchMainDB } from '@/utils/db';
import * as React from 'react';
import { User } from '../types';
import { Button, Typography } from '@mui/material';
import OrderTable from '@/components/server/OrderTable';

export type FoodPageProps = object;

const FoodPage: React.FC<FoodPageProps> = async ({}) => {
	const { sessionId, user } = await auth();

	const foodDB = await fetchFoodDB();
	const mainDB = await fetchMainDB();

	const orders = foodDB.orders.filter((o) => o.user.id === user?.id);

	return (
		<Page>
			<div className="mb-2">
				<Typography color="warning" variant="body2" lineHeight={1.1}>
					{foodDB.message}
				</Typography>
			</div>
			<OrderForm
				user={user as User}
				users={mainDB.users}
				sessionId={sessionId}
				MainButton={Button}
				className="my-1"
				show={foodDB.open}
			/>
			<OrderTable orders={orders} />
			<SiteIframe menuLinks={foodDB.menuLinks} />
		</Page>
	);
};

export default FoodPage;
