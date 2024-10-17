'use client';

import { MenuLinkType } from '@/app/types';
import { Divider, IconButton, Stack, Switch, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import EditField from './EditField';
import { deleteMenuLink, updateMenuLink } from '@/app/admin/actions';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export type MenuLinkProps = {
	menuLink: MenuLinkType;
	i: number;
};

const MenuLink: React.FC<MenuLinkProps> = ({ menuLink, i }) => {
	const [url, setUrl] = useState(menuLink.url);

	const handleEdit = () => {
		updateMenuLink({ ...menuLink, url }, i);
	};

	const handleDelete = () => {
		deleteMenuLink(i);
	};

	const handleIframe = () => updateMenuLink({ ...menuLink, useIframe: !menuLink.useIframe }, i);

	return (
		<>
			<EditField
				size="small"
				variant="standard"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				onEdit={handleEdit}
				onDelete={handleDelete}
			>
				<IconButton color="secondary" onClick={handleIframe}>
					{menuLink.useIframe ? <Visibility /> : <VisibilityOff />}
				</IconButton>
			</EditField>
			<Divider />
		</>
	);
};

export default MenuLink;
