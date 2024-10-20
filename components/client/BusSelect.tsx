'use client';

import { setUserBus } from '@/app/actions';
import { Bus, User } from '@/app/types';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import * as React from 'react';

export type BusSelectProps = {
	buses: Bus[];
	user: User | null;
};

const BusSelect: React.FC<BusSelectProps> = ({ buses, user }) => {
	if (!user) return null;

	const handleChange = (e: SelectChangeEvent<string>) => {
		const bus = buses.find(({ id }) => id === e.target.value);
		if (bus) setUserBus(user, bus.id);
	};

	const menuItems = buses.map((b) => (
		<MenuItem key={b.id} value={b.id}>
			{b.name}
		</MenuItem>
	));

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Your Bus</InputLabel>
				<Select
					size="small"
					required
					value={user.busId || ''}
					label="Your Bu"
					onChange={handleChange}
				>
					{menuItems}
				</Select>
			</FormControl>
		</Box>
	);
};

export default BusSelect;
