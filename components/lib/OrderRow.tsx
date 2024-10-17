import { Order } from '@/app/types';
import * as React from 'react';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import CompleteCheckbox from './CompleteCheckbox';
import { auth } from '@/utils/auth';
import OrderModal from '../OrderModal';
import { Edit } from '@mui/icons-material';

export type OrderRowProps = {
	order: Order;
	i: number;
};

const OrderRow: React.FC<OrderRowProps> = async ({ order, i }) => {
	const { adminToken, sessionId } = auth();
	const isAdmin = adminToken === process.env.TOKEN;
	const isOwner = sessionId === order.sessionId;

	return (
		<TableRow key={order.sessionId} className="">
			{isAdmin && (
				<TableCell align="left" padding="checkbox">
					<Typography>{i + 1}</Typography>
				</TableCell>
			)}
			<TableCell align="left" padding="checkbox">
				<Typography>{order.name}</Typography>
			</TableCell>
			<TableCell align="right">{order.order}</TableCell>
			{(isAdmin || isOwner) && (
				<TableCell align="right">
					<OrderModal btnTxt="Update Order" token={sessionId} existingOrder={order}>
						<IconButton>
							<Edit />
						</IconButton>
					</OrderModal>
				</TableCell>
			)}
			{isAdmin && (
				<TableCell align="right">
					<CompleteCheckbox order={order} />
				</TableCell>
			)}
		</TableRow>
	);
};

export default OrderRow;
