'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteOrder, submitOrder } from '@/app/actions';
import { order } from '@/app/types';
import { IconButton } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';

export type OrderModalProps = React.PropsWithChildren & {
	existingOrder?: order;
	token: string;
	btnTxt: string;
};

const OrderModal: React.FC<OrderModalProps> = ({ existingOrder, token, btnTxt, children }) => {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState(existingOrder?.name || '');
	const [order, setOrder] = React.useState(existingOrder?.order || '');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setName('');
		setOrder('');
		setOpen(false);
	};

	const handleSubmit = async (formData: FormData) => {
		await submitOrder(formData);
		handleClose();
	};

	const handleDelete = async () => {
		if (existingOrder) {
			await deleteOrder(existingOrder?.id);
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
					{existingOrder && (
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
						value={order}
						onChange={(e) => setOrder(e.target.value)}
						multiline
						name="order"
						label="Items"
						variant="standard"
						fullWidth
					/>
					<TextField hidden value={token} name="token" />
					<TextField hidden value={existingOrder?.id} name="id" />
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

export default OrderModal;
