'use client';

import { newMenuLink } from '@/app/admin/actions';
import { Add, AddRounded } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import * as React from 'react';

export type NewMenuLinkBtnProps = {};

const NewMenuLinkBtn: React.FC<NewMenuLinkBtnProps> = ({}) => {
	return (
		<IconButton size="large" onClick={() => newMenuLink()}>
			<AddRounded color="primary" />
		</IconButton>
	);
};

export default NewMenuLinkBtn;
