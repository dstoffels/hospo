'use client';

import { Order, User } from '@/app/types';
import { Button, ButtonProps, IconButton, Popover, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import UserSelect from './UserSelect';
import { v4 } from 'uuid';
import { deleteOrder, placeOrder, updateOrder } from '@/app/actions';
import { Delete } from '@mui/icons-material';

export type OrderFormProps = {
	user: User | undefined;
	users: User[];
	sessionId: string;
	existingOrder?: Order;
	MainButton: React.FC<ButtonProps>;
	className?: string;
};

const OrderForm: React.FC<OrderFormProps> = ({
	user,
	users,
	sessionId,
	existingOrder,
	MainButton,
	className = '',
}) => {
	const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
	const [order, setOrder] = useState(existingOrder?.order || '');
	const open = Boolean(anchor);

	useEffect(() => {
		if (existingOrder && order !== existingOrder?.order) setOrder(existingOrder.order);
	}, [existingOrder]);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget);

	const handleClose = () => setAnchor(null);

	const handleSubmit = async () => {
		if (existingOrder) await updateOrder({ ...existingOrder, order });
		else await placeOrder({ id: v4(), user, fulfilled: false, order } as Order);
		setOrder('');
		handleClose();
	};

	return (
		<div className={`flex justify-center w-full items-center ${className}`}>
			<MainButton variant="contained" fullWidth color="error" onClick={handleClick}>
				Place Order
			</MainButton>
			<Popover
				open={open}
				anchorEl={anchor}
				onClose={handleClose}
				elevation={4}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				slotProps={{ paper: { sx: { width: '100%' } } }}
			>
				<form action={handleSubmit} className="p-2 w-full">
					<Stack spacing={1}>
						<TextField
							label={`${user?.name}'s Order`}
							name="order"
							multiline
							fullWidth
							variant="standard"
							value={order}
							onChange={(e) => setOrder(e.target.value)}
						/>
						<div className="flex justify-between items-center">
							<UserSelect user={user} users={users} sessionId={sessionId} />
							{existingOrder && (
								<IconButton onClick={() => deleteOrder(existingOrder)} color="error">
									<Delete />
								</IconButton>
							)}
						</div>
						<div className="flex justify-end">
							<Button onClick={handleClose} color="error">
								Cancel
							</Button>
							<Button type="submit">{existingOrder ? 'Update' : 'Place'} Order</Button>
						</div>
					</Stack>
				</form>
			</Popover>
		</div>
	);
};

export default OrderForm;
