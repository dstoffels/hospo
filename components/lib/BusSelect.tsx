'use client';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

export type BusSelectProps = object;

const BusSelect: React.FC<BusSelectProps> = ({}) => {
	const [bus, setBus] = useState('');

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Bus</InputLabel>
				<Select required value={bus} label="Bus" onChange={(e) => setBus(e.target.value as string)}>
					<MenuItem value={'Elle'}>Elle</MenuItem>
					<MenuItem value={'Band/Crew'}>Band/Crew</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default BusSelect;
