'use client';

import { User } from '@/app/types';
import { DirectionsBus, Restaurant, Settings } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { redirect, usePathname } from 'next/navigation';
import * as React from 'react';

export type NavProps = { user: User | null };

const Nav: React.FC<NavProps> = ({ user }) => {
	const path = usePathname();

	if (path !== '/' && !user) {
		redirect('/');
	}
	return (
		<Paper elevation={24} square variant="outlined" className="fixed w-full bottom-0">
			<BottomNavigation value={path} showLabels>
				<BottomNavigationAction
					disabled={path === '/food'}
					value="/food"
					label="Food"
					icon={<Restaurant />}
					href="/food"
				/>
				<BottomNavigationAction
					value="/busstock"
					label="Bus Stock"
					icon={<DirectionsBus />}
					href="/busstock"
					disabled={path === '/busstock'}
				/>
				<BottomNavigationAction
					disabled={path === '/admin'}
					value="/admin"
					label="Admin"
					icon={<Settings />}
					href="/admin"
				/>
			</BottomNavigation>
		</Paper>
	);
};

export default Nav;
