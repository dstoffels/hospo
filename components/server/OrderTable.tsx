import { Order } from '@/app/types';
import * as React from 'react';
import { Paper, Table, TableBody, TableContainer, Typography } from '@mui/material';
import OrderRow from './OrderRow';

export type OrderTableProps = {
	orders: Order[];
	heading?: string;
};

const OrderTable: React.FC<OrderTableProps> = async ({ orders, heading }) => {
	const rows = orders.map((o, i) => <OrderRow key={o.id} order={o} i={i} />);

	return (
		orders.length > 0 && (
			<div>
				<Typography variant="h6">{heading}</Typography>
				<TableContainer component={Paper} elevation={12} className="bg-gray-100">
					<Table size="small" padding="none">
						<TableBody>{rows}</TableBody>
					</Table>
				</TableContainer>
			</div>
		)
	);
};

export default OrderTable;
