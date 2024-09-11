'use client';

import { Pet } from '@/lib/types';
import { useState, createContext } from 'react';

type TPetContext = {
	pets: Pet[];
	selectedPetId: string | null;
	handleUpdateSelectedPedId: (id: string) => void;
	setPets: (pets: Pet[]) => void;
	numberOfPets: number;
	selectedPet: Pet | undefined;
};

type TPetContextProvider = {
	data: Pet[];
	children: React.ReactNode;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
	data,
	children,
}: TPetContextProvider) {
	const [pets, setPets] = useState(data);
	const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
	const numberOfPets = pets.length;

	const handleUpdateSelectedPedId = (id: string) => {
		setSelectedPetId(id);
	};

	const selectedPet = pets.find((pet) => pet.id === selectedPetId);

	return (
		<PetContext.Provider
			value={{
				pets,
				setPets,
				numberOfPets,
				selectedPetId,
				handleUpdateSelectedPedId,
				selectedPet,
			}}>
			{children}
		</PetContext.Provider>
	);
}
