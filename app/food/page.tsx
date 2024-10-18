import OrderForm from '@/components/OrderForm';
import Page from '@/components/Page';
import SiteIframe from '@/components/SiteIframe';
import { auth } from '@/utils/auth';
import { fetchFoodDB, fetchMainDB } from '@/utils/db';
import * as React from 'react';
import { User } from '../types';
import { Button, Typography } from '@mui/material';
import OrderTable from '@/components/OrderTable';

export type FoodPageProps = object;

const FoodPage: React.FC<FoodPageProps> = async ({}) => {
	const { sessionId, user } = await auth();

	const foodDB = await fetchFoodDB();
	const mainDB = await fetchMainDB();

	const orders = foodDB.orders.filter((o) => o.user.id === user?.id);

	return (
		<Page>
			<Typography>{foodDB.message}</Typography>
			<SiteIframe menuLinks={foodDB.menuLinks} />
			<OrderForm
				user={user as User}
				users={mainDB.users}
				sessionId={sessionId}
				MainButton={Button}
				className="my-1"
			/>
			<OrderTable orders={orders} />
		</Page>
	);
};

export default FoodPage;
