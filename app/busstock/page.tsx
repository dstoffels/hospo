import BusSelect from '@/components/lib/BusSelect';
import Panel from '@/components/lib/Panel';
import Page from '@/components/Page';
import { Typography } from '@mui/material';
import * as React from 'react';

export type BusStockPageProps = object;

const BusStockPage: React.FC<BusStockPageProps> = async ({}) => {
	return (
		<Page>
			<div className="flex flex-col items-center justify-center">
				<Panel className="mb-2">
					<Typography variant="overline">Your Stock</Typography>
				</Panel>
				<Panel>
					<BusSelect />
				</Panel>
			</div>
		</Page>
	);
};

export default BusStockPage;
