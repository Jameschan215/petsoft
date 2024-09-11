'use client';

import { useSearchContext } from '@/lib/hooks';

export default function SearchForm() {
	const { searchText, handleUpdateSearchText } = useSearchContext();

	return (
		<form className="w-full h-full">
			<input
				className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition hover:bg-white/30 focus:bg-white/50 placeholder:text-white/50"
				placeholder="Search pets..."
				type="search"
				value={searchText}
				onChange={(e) => {
					handleUpdateSearchText(e.target.value);
				}}
			/>
		</form>
	);
}
