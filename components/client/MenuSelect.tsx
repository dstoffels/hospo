'use client';

import { MenuLinkType } from '@/app/types';
import { FormControl, InputLabel, MenuItem, Select, SelectProps, Typography } from '@mui/material';
import * as React from 'react';

export type MenuSelectProps = SelectProps & {
	menuLinks: MenuLinkType[];
};

const MenuSelect: React.FC<MenuSelectProps> = ({ menuLinks, ...props }) => {
	if (menuLinks.length === 0) return null;
	if (menuLinks.length === 1)
		return (
			<Typography variant="overline" fontSize={14}>
				{menuLinks[0].meal}
			</Typography>
		);

	const selectOptions = menuLinks.map((ml, i) => (
		<MenuItem value={ml.title} key={`${i}-${ml.url}`}>
			<span className="max-w-lg overflow-hidden text-ellipsis">
				{ml.meal}: {ml.title}
			</span>
		</MenuItem>
	));

	return (
		<div className="mb-2">
			<FormControl fullWidth>
				<InputLabel>Menu Options</InputLabel>
				<Select {...props} variant="outlined" size="small" label="Menu Options">
					{selectOptions}
				</Select>
			</FormControl>
		</div>
	);
};

export default MenuSelect;
