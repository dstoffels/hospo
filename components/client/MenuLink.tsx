'use client';

import { MealOptions, MenuLinkType } from '@/app/types';
import { Divider, IconButton } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import EditField from './EditField';
import { deleteMenuLink, updateMenuLink } from '@/app/admin/actions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MealSelect from './MealSelect';

export type MenuLinkProps = {
	menuLink: MenuLinkType;
	i: number;
};

const MenuLink: React.FC<MenuLinkProps> = ({ menuLink, i }) => {
	const [url, setUrl] = useState(menuLink.url);
	const [meal, setMeal] = useState(menuLink.meal);

	const handleEdit = () => {
		updateMenuLink({ ...menuLink, url, meal }, i);
	};

	const handleDelete = () => {
		deleteMenuLink(i);
	};

	const handleIframe = () => updateMenuLink({ ...menuLink, useIframe: !menuLink.useIframe }, i);

	return (
		<>
			<div className="flex max-w-full">
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
					<MealSelect value={meal} onChange={(e) => setMeal(e.target.value as MealOptions)} />
				</EditField>
			</div>
			<Divider />
		</>
	);
};

export default MenuLink;
