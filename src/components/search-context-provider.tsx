'use client';

import { useState, createContext } from 'react';

type TSearchContext = {
	searchText: string;
	handleUpdateSearchText: (text: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [searchText, setSearchText] = useState('');

	function handleUpdateSearchText(text: string) {
		setSearchText(text);
	}

	return (
		<SearchContext.Provider value={{ searchText, handleUpdateSearchText }}>
			{children}
		</SearchContext.Provider>
	);
}
