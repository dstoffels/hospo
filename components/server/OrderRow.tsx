import { Order, User } from '@/app/types';
import * as React from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import CompleteCheckbox from '../client/CompleteCheckbox';
import { auth } from '@/utils/auth';
import OrderForm from '../client/OrderForm';
import EditBtn from '../client/EditBtn';
import { fetchMainDB } from '@/utils/db';

export type OrderRowProps = {
	order: Order;
	i: number;
};

const OrderRow: React.FC<OrderRowProps> = async ({ order, i }) => {
	const { isAdmin, sessionId, user } = await auth();
	const isOwner = user?.id === order.user.id;

	const { users } = await fetchMainDB();

	return (
		<TableRow>
			{isAdmin && (
				<TableCell align="left" padding="checkbox">
					<Typography>{i + 1}</Typography>
				</TableCell>
			)}
			<TableCell sx={{ padding: 0.5 }}>
				<Typography fontWeight={600} noWrap>
					{order.user.name}
				</Typography>
			</TableCell>
			<TableCell sx={{ width: '100%', padding: 0.5 }}>{order.order}</TableCell>
			{(isAdmin || isOwner) && (
				<TableCell align="right">
					<OrderForm
						MainButton={EditBtn}
						sessionId={sessionId}
						user={user as User}
						users={users}
						existingOrder={order}
						show
					/>
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
