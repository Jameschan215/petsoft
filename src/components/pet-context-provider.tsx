'use client';

import { addPet } from '@/actions/actions';
import { Pet } from '@prisma/client';
import { useState, createContext } from 'react';

type TPetContext = {
	pets: Pet[];
	selectedPetId: string | null;
	handleUpdateSelectedPedId: (id: string) => void;

	numberOfPets: number;
	selectedPet: Pet | undefined;
	handleAddPet: (newPet: Omit<Pet, 'id'>) => Promise<void>;
	// handleCheckoutPet: (id: string) => Promise<void>;
	// handleEditPet: (id: string, newPet: Omit<Pet, 'id'>) => void;
};

type TPetContextProvider = {
	data: Pet[];
	children: React.ReactNode;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
	data: pets,
	children,
}: TPetContextProvider) {
	// State

	const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

	// Derived state
	const numberOfPets = pets.length;
	const selectedPet = pets.find((pet) => pet.id === selectedPetId);

	// Actions
	const handleUpdateSelectedPedId = (id: string) => {
		setSelectedPetId(id);
	};

	const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
		await addPet(newPet);
	};

	// const handleEditPet = async (id: string, newPetData: Omit<Pet, 'id'>) => {
	// 	const error = await updatePet(id, newPetData);

	// 	if (error) {
	// 		toast.error(error.message);
	// 	}
	// };

	// const handleCheckoutPet = async (id: string) => {
	// 	await deletePet(id);
	// 	setSelectedPetId(null);
	// 	return null;
	// };

	return (
		<PetContext.Provider
			value={{
				pets,
				numberOfPets,
				selectedPetId,
				handleUpdateSelectedPedId,
				selectedPet,
				handleAddPet,
				// handleEditPet,
				// handleCheckoutPet,
			}}>
			{children}
		</PetContext.Provider>
	);
}
