'use client';

import { newMenuLink } from '@/app/admin/actions';
import { AddRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as React from 'react';

export type NewMenuLinkBtnProps = object;

const NewMenuLinkBtn: React.FC<NewMenuLinkBtnProps> = ({}) => {
	return (
		<IconButton size="large" onClick={() => newMenuLink()}>
			<AddRounded color="primary" />
		</IconButton>
	);
};

export default NewMenuLinkBtn;
