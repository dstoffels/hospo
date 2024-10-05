import { order } from '@/app/types';
import * as React from 'react';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import CompleteCheckbox from '../CompleteCheckbox';
import { getTokens } from '@/utils/cookies';
import OrderModal from '../OrderModal';
import { Edit } from '@mui/icons-material';

export type OrderRowProps = {
	order: order;
};

const OrderRow: React.FC<OrderRowProps> = async ({ order }) => {
	const { adminToken, sessionId } = getTokens();
	const isAdmin = adminToken === process.env.TOKEN;
	const isOwner = sessionId === order.token;

	return (
		<TableRow key={order.token} className="">
			<TableCell align="left">
				<Typography>{order.name}</Typography>
			</TableCell>
			<TableCell align="justify">{order.order}</TableCell>
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
