'use client';

import { Check, Delete, Edit } from '@mui/icons-material';
import { IconButton, TextField, TextFieldProps, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

export type EditFieldProps = TextFieldProps &
	React.PropsWithChildren & {
		onDelete?: () => void;
		onEdit?: () => void;
	};

const EditField: React.FC<EditFieldProps> = ({ onDelete, onEdit, children, ...props }) => {
	const [editing, setEditing] = useState(Boolean(!props.value));

	const handleEditing = () => {
		setEditing(!editing);

		if (editing && onEdit) onEdit();
	};

	return (
		<div className="flex justify-between items-baseline w-full">
			{editing ? (
				<TextField {...props} className="flex-grow" />
			) : (
				<Typography onClick={handleEditing} className="flex-grow text-ellipsis overflow-hidden">
					{props.value as string}
				</Typography>
			)}
			<div className="flex justify-end">
				<IconButton onClick={handleEditing}>
					{editing ? <Check color="success" /> : <Edit color="info" />}
				</IconButton>
				{Boolean(onDelete) && (
					<IconButton color="error" onClick={onDelete}>
						<Delete />
					</IconButton>
				)}
				{children}
			</div>
		</div>
	);
};

export default EditField;
