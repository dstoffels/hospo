'use client';

import { addBus } from '@/app/busstock/actions';
import { AddRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as React from 'react';

export type NewBusBtnProps = object;

const NewBusBtn: React.FC<NewBusBtnProps> = ({}) => {
	return (
		<IconButton size="large" onClick={() => addBus()}>
			<AddRounded color="primary" />
		</IconButton>
	);
};

export default NewBusBtn;
