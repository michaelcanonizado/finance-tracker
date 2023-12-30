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
			<div className="">
				<LandingNavbar className="bg-blue-200" />
				{children}
			</div>
		);
	}

	return (
		<div className="flex">
			<DashboardSidebar className="bg-red-200 min-h-screen" />
			<div className="grow">
				<DashboardNavbar className="bg-blue-200" />
				{children}
			</div>
		</div>
	);
};

export default AuthStatus;
