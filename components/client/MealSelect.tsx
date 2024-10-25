'use client';

import { mealOptions } from '@/app/types';
import { MenuItem, Select, SelectProps } from '@mui/material';
import * as React from 'react';

export type MealSelectProps = SelectProps;

const MealSelect: React.FC<MealSelectProps> = ({ value, onChange }) => {
	const options = mealOptions.map((o) => (
		<MenuItem key={`option-${o}`} value={o}>
			{o}
		</MenuItem>
	));
	return (
		<Select size="small" value={value} onChange={onChange}>
			{options}
		</Select>
	);
};

export default MealSelect;
