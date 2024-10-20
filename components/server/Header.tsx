import { Paper, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import Link from 'next/link';

export type HeaderProps = object;

const Header: React.FC<HeaderProps> = async ({}) => {
	return (
		<Paper component={'header'} elevation={1} square>
			<Link href="/" className="flex items-center">
				<Image src="/images/elle-king-logo.png" width={150} height={50} alt="logo" priority />
				<Typography variant="h6">Hospice</Typography>
			</Link>
		</Paper>
	);
};

export default Header;
