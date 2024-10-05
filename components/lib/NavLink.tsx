'use client';

import { Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export type NavLinkProps = React.PropsWithChildren & {
	href: string;
};

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => {
	const path = usePathname();

	const isPath = path === href;

	const highlight = isPath ? 'bg-white/10 border border-gray-700' : '';

	return (
		<Link className={`py-1 w-full text-center ${highlight} rounded-sm`} href={href}>
			<Typography color={isPath ? '' : 'info'} variant="h6">
				{children}
			</Typography>
		</Link>
	);
};

export default NavLink;
