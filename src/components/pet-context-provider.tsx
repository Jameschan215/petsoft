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
	handleCheckoutPet: (id: string) => void;
	handleAddPet: (newPet: Omit<Pet, 'id'>) => void;
	handleEditPet: (newPet: Pet) => void;
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
	const selectedPet = pets.find((pet) => pet.id === selectedPetId);

	const handleUpdateSelectedPedId = (id: string) => {
		setSelectedPetId(id);
	};

	const handleAddPet = (newPet: Omit<Pet, 'id'>) => {
		setPets((prev) => [
			...prev,
			{ ...newPet, id: (prev.length + 1).toString() },
		]);
	};

	const handleEditPet = (newPet: Pet) => {
		setPets((prev) =>
			prev.map((pet) => {
				if (pet.id === newPet.id) return newPet;
				else return pet;
			})
		);
	};

	const handleCheckoutPet = (id: string) => {
		setPets((prev) => prev.filter((pet) => pet.id !== id));
		setSelectedPetId(null);
	};

	return (
		<PetContext.Provider
			value={{
				pets,
				setPets,
				numberOfPets,
				selectedPetId,
				handleUpdateSelectedPedId,
				selectedPet,
				handleCheckoutPet,
				handleAddPet,
				handleEditPet,
			}}>
			{children}
		</PetContext.Provider>
	);
}
