import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-pattern';
import PetContextProvider from '@/components/pet-context-provider';
import SearchContextProvider from '@/components/search-context-provider';
import { fetchPets } from '@/lib/data';
import React from 'react';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const data = await fetchPets();

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
		</>
	);
}
