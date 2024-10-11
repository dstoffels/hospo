'use client';

import { stockItem } from '@/app/types';
import { Close, Delete } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	TextField,
} from '@mui/material';
import * as React from 'react';

export type StockModalProps = React.PropsWithChildren & {
	existingItem?: stockItem;
	token: string;
	btnTxt: string;
};

const StockModal: React.FC<StockModalProps> = ({ children, existingItem, token, btnTxt }) => {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState(existingItem?.name || '');
	const [item, setItem] = React.useState(existingItem?.item || '');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setName('');
		setItem('');
		setOpen(false);
	};

	const handleSubmit = async (formData: FormData) => {
		formData.getAll('');
		// await submitStockItem(formData);
		handleClose();
	};

	const handleDelete = async () => {
		if (existingItem) {
			// await deleteStockItem(existingItem?.id);
			handleClose();
		}
	};
	return (
		<>
			<div onClick={handleOpen}>{children}</div>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					action: handleSubmit,
				}}
			>
				<DialogTitle className="flex justify-between items-center">
					<div>Aftershow Order</div>
					{existingItem && (
						<IconButton className="p-0" onClick={handleDelete} size="large">
							<Delete className="text-3xl" color="error" />
						</IconButton>
					)}
					<IconButton className="p-0" onClick={handleClose} size="large">
						<Close className="text-3xl" color="warning" />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>Write in your aftershow items from the menu</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						label="Name"
						fullWidth
						variant="standard"
					/>
					<TextField
						value={item}
						onChange={(e) => setItem(e.target.value)}
						multiline
						name="order"
						label="Items"
						variant="standard"
						fullWidth
					/>
					<TextField className="hidden" type="hidden" hidden value={token} name="token" />
					<TextField className="hidden" type="hidden" hidden value={existingItem?.id} name="id" />
				</DialogContent>
				<DialogActions>
					<Button color="error" onClick={handleClose}>
						Close
					</Button>
					<Button type="submit">{btnTxt}</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default StockModal;
