'use client';

import { DirectionsBus, Restaurant, Settings } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export type NavProps = object;

const Nav: React.FC<NavProps> = ({}) => {
	const path = usePathname();

	return (
		<Paper elevation={24} square variant="outlined">
			<BottomNavigation value={path} showLabels>
				<BottomNavigationAction value="/food" label="Food" icon={<Restaurant />} href="/food" />
				<BottomNavigationAction
					value="/busstock"
					label="Bus Stock"
					icon={<DirectionsBus />}
					href="/busstock"
				/>
				<BottomNavigationAction value="/admin" label="Admin" icon={<Settings />} href="/admin" />
			</BottomNavigation>
		</Paper>
	);
};

export default Nav;
