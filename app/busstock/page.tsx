import BusSelect from '@/components/client/BusSelect';
import Panel from '@/components/server/Panel';
import Page from '@/components/server/Page';
import * as React from 'react';
import { auth } from '@/utils/auth';
import { fetchBusDB, fetchMainDB } from '@/utils/db';
import StockForm from '@/components/client/StockForm';
import { Button } from '@mui/material';
import { Bus } from '../types';
import StockTable from '@/components/server/StockTable';

export type BusStockPageProps = object;

const BusStockPage: React.FC<BusStockPageProps> = async ({}) => {
	const { sessionId, user } = await auth();
	const { users } = await fetchMainDB();
	const { buses } = await fetchBusDB();

	const bus = buses.find(({ id }) => id === user?.busId) as Bus;

	return (
		<Page>
			<Panel className="space-y-2">
				<BusSelect user={user} buses={buses} />
				<StockForm
					sessionId={sessionId}
					MainButton={Button}
					busId={user?.busId as string}
					user={user}
					users={users}
				/>
			</Panel>
			<StockTable bus={bus} />
		</Page>
	);
};

export default BusStockPage;
