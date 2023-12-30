import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import AuthStatus from './AuthStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Expenses Tracker',
	description: 'An Expenses Tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthStatus>{children}</AuthStatus>
			</body>
		</html>
	);
}
