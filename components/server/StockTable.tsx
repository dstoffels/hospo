import { Bus } from '@/app/types';
import { Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import * as React from 'react';
import StockRow from './StockRow';
import { auth } from '@/utils/auth';

export type StockTableProps = {
	bus: Bus | undefined;
};

const StockTable: React.FC<StockTableProps> = async ({ bus }) => {
	if (!bus) return null;

	const { isAdmin, user } = await auth();

	const rows = bus.stock.map((item) => (
		<StockRow key={item.id} item={item} bus={bus} isAdmin={isAdmin} user={user} />
	));

	return (
		<div className="mt-2">
			<Typography variant="overline">Bus Stock</Typography>

			<TableContainer component={Paper} elevation={12} className="bg-gray-100">
				<Table size="small" padding="none">
					<TableBody>{rows}</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default StockTable;
