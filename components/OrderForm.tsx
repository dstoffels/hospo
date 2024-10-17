'use client';

import { User } from '@/app/types';
import { Button, Popover, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import UserSelect from './UserSelect';

export type OrderFormProps = {
	user: User | undefined;
	users: User[];
	sessionId: string;
};

const OrderForm: React.FC<OrderFormProps> = ({ user, users, sessionId }) => {
	const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

	const open = Boolean(anchor);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget);

	const handleClose = () => setAnchor(null);

	return (
		<div className="flex justify-center pt-2 w-full">
			<Button variant="contained" fullWidth color="error" onClick={handleClick}>
				Place Order
			</Button>
			<Popover
				open={open}
				anchorEl={anchor}
				onClose={handleClose}
				elevation={4}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				slotProps={{ paper: { sx: { width: '100%' } } }}
			>
				<form action="" className="p-2 w-full">
					<Stack spacing={1}>
						<TextField label={`${user?.name}'s Order`} name="order" multiline fullWidth />
						<UserSelect user={user} users={users} sessionId={sessionId} />
						<div className="flex justify-end">
							<Button onClick={handleClose} color="error">
								Cancel
							</Button>
							<Button>Place Order</Button>
						</div>
					</Stack>
				</form>
			</Popover>
		</div>
	);
};

export default OrderForm;
