import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-pattern';
import PetContextProvider from '@/components/pet-context-provider';
import SearchContextProvider from '@/components/search-context-provider';
import prisma from '@/lib/db';
import React from 'react';
import { Toaster } from 'sonner';
import { checkAuth } from '@/lib/server-utils';
import { fetchPetsByUserId } from '@/lib/data';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await checkAuth();
	const data = await fetchPetsByUserId(session.user?.id!);

	return (
		<>
			<BackgroundPattern />

			<div className="max-w-[1050px] min-h-screen mx-auto px-4 flex flex-col">
				<AppHeader />
				<SearchContextProvider>
					<PetContextProvider data={data}>{children}</PetContextProvider>
				</SearchContextProvider>
				<AppFooter />
			</div>

			<Toaster richColors closeButton position="top-center" />
		</>
	);
}
