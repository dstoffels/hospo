import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/client/Nav';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Header from '@/components/server/Header';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/utils/theme';
import { auth } from '@/utils/auth';

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = await auth();

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
			>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Header />
						<main className="flex-grow flex flex-col h-full">{children}</main>
						<Nav user={user} />
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
