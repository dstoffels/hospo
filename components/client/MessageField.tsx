'use client';

import { FoodDB } from '@/app/types';
import { Close } from '@mui/icons-material';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';

export type MessageFieldProps = {
	db: FoodDB;
	onChange: (message: string) => Promise<void>;
};

const MessageField: React.FC<MessageFieldProps> = ({ db, onChange }) => {
	const [message, setMessage] = useState(db.message || '');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handler = setTimeout(async () => {
			if (message !== db.message) {
				await onChange(message);
				setLoading(false);
			}
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [message, db.message]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setLoading(true);
		setMessage(e.target.value);
	};
	return (
		<TextField
			value={message}
			onChange={handleChange}
			name="message"
			label="Message"
			multiline
			variant="standard"
			slotProps={{
				input: {
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={() => setMessage('')}>
								{loading ? <CircularProgress size={20} /> : <Close />}
							</IconButton>
						</InputAdornment>
					),
				},
			}}
		/>
	);
};

export default MessageField;
