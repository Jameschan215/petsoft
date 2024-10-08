import Logo from '@/components/logo';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col justify-center items-center gap-y-5 min-h-screen">
			<Logo />
			{children}
		</div>
	);
}
