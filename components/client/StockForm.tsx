'use client';

import { addStock, deleteStock, updateStock } from '@/app/busstock/actions';
import { StockItemType, User } from '@/app/types';
import { Button, ButtonProps, IconButton, Popover, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import UserSelect from './UserSelect';
import { Delete } from '@mui/icons-material';

export type StockFormProps = {
	busId: string;
	user: User | null;
	users: User[];
	sessionId: string;
	existingItem?: StockItemType;
	MainButton: React.FC<ButtonProps>;
	className?: string;
};

const StockForm: React.FC<StockFormProps> = ({
	busId,
	user,
	users,
	sessionId,
	existingItem,
	MainButton,
	className = '',
}) => {
	const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
	const [item, setItem] = useState(existingItem?.item || '');
	const open = Boolean(anchor);

	useEffect(() => {
		if (existingItem && item !== existingItem?.item) setItem(existingItem.item);
	}, [existingItem]);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget);

	const handleClose = () => setAnchor(null);

	const handleSubmit = async () => {
		if (existingItem) await updateStock(busId, { ...existingItem, item });
		else await addStock(busId, { id: v4(), user, item } as StockItemType);
		setItem('');
		handleClose();
	};

	return (
		<div className={`flex justify-center w-full items-center ${className}`}>
			<MainButton variant="contained" className="w-full" color="error" onClick={handleClick}>
				Add Bus Stock
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
							label={`Stock item for ${user?.name}`}
							name="order"
							multiline
							fullWidth
							variant="standard"
							value={item}
							onChange={(e) => setItem(e.target.value)}
						/>
						<div className="flex justify-between items-center">
							<UserSelect user={user} users={users} sessionId={sessionId} />
							{existingItem && (
								<IconButton onClick={() => deleteStock(existingItem.id)} color="error">
									<Delete />
								</IconButton>
							)}
						</div>
						<div className="flex justify-end">
							<Button onClick={handleClose} color="error">
								Cancel
							</Button>
							<Button type="submit">{existingItem ? 'Update' : 'Add'} Item</Button>
						</div>
					</Stack>
				</form>
			</Popover>
		</div>
	);
};

export default StockForm;
