import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Image from 'next/image';
import { Typography } from '@mui/material';
import NavLink from '@/components/lib/NavLink';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Elle King Hospice',
	description: 'Created by Dan-O',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
			>
				<header>
					<div className="flex items-center">
						<Image src="/images/elle-king-logo.png" width={250} height={250} alt="logo" priority />
						<Typography variant="h5">Hospice</Typography>
					</div>
					<nav className="flex justify-around pb-2 px-1">
						<NavLink href="/">Aftershow</NavLink>
						<NavLink href="/busstock">Bus Stock</NavLink>
						<NavLink href="/admin">Admin</NavLink>
					</nav>
				</header>
				<main className="flex-grow flex flex-col h-full">{children}</main>
			</body>
		</html>
	);
}
