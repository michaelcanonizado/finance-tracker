'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import LandingNavbar from '@/components/navigation/navbar/LandingNavbar';
import DashboardNavbar from '@/components/navigation/navbar/DashboardNavbar';
import DashboardSidebar from '@/components/navigation/sidebar/DashboardSidebar';

const AuthStatus = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	if (pathname === '/') {
		return (
			<div className={``}>
				<LandingNavbar className="" />
				{children}
			</div>
		);
	}

	return (
		<div className={`flex`}>
			<DashboardSidebar className=" min-h-screen" />
			<div className="grow">
				<DashboardNavbar className="dark:bg-red-400" />
				{children}
			</div>
		</div>
	);
};

export default AuthStatus;
