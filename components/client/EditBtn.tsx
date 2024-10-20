'use client';

import { Edit } from '@mui/icons-material';
import { ButtonProps, IconButton } from '@mui/material';
import * as React from 'react';

export type EditBtnProps = ButtonProps;

const EditBtn: React.FC<EditBtnProps> = (props) => {
	return (
		<IconButton {...props}>
			<Edit />
		</IconButton>
	);
};

export default EditBtn;
