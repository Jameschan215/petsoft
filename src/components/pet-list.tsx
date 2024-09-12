'use client';

import { usePetContext, useSearchContext } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function PetList() {
	const { pets, selectedPetId, handleUpdateSelectedPedId } = usePetContext();
	const { searchText } = useSearchContext();

	// When searchText equals '', i.e. empty, return the original array!!!
	const filteredPets = pets.filter((pet) => {
		const lowerSearchText = searchText.toLowerCase();
		if (pet.ownerName.toLowerCase().includes(lowerSearchText)) {
			return pet;
		}
	});

	return (
		<ul className="bg-white ">
			{filteredPets.map((pet) => (
				<li key={pet.id} className="border-b border-light">
					<button
						onClick={() => handleUpdateSelectedPedId(pet.id)}
						className={cn(
							'h-[70px] w-full flex items-center cursor-pointer px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition',
							{
								'bg-[#eff1f2]': pet.id === selectedPetId,
							}
						)}>
						<Image
							src={pet.imageUrl}
							alt="Pet image"
							width={45}
							height={45}
							className="rounded-full object-cover w-[45px] h-[45px]"
						/>
						<p className="font-semibold">{pet.name}</p>
					</button>
				</li>
			))}
		</ul>
	);
}
