'use client';

import { createPet, deletePet, updatePet } from '@/actions/actions';
import { PetData } from '@/lib/types';
import { PetFormSchema, TPetForm } from '@/lib/validations';
import { Pet } from '@prisma/client';
import { useState, createContext, useOptimistic, startTransition } from 'react';
import { toast } from 'sonner';

type TPetContext = {
	pets: Pet[];
	selectedPetId: string | null;
	handleUpdateSelectedPedId: (id: string) => void;
	numberOfPets: number;
	selectedPet: Pet | undefined;
	handleAddPet: (petData: PetData) => Promise<void>;
	handleCheckoutPet: (id: string) => Promise<void>;
	handleEditPet: (
		id: string,
		petData: PetData
	) => Promise<{ message: string } | undefined>;
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
	// State
	// use optimistic ui
	const [optimisticPets, setOptimisticPets] = useOptimistic(
		data,
		(prevState, { action, payload }) => {
			switch (action) {
				case 'add':
					return [
						...prevState,
						{ id: new Date().getTime().toString(), ...payload },
					];
				case 'edit':
					return prevState.map((pet) => {
						if (pet.id === payload.id) {
							return { ...pet, ...payload.petData };
						}
						return pet;
					});
				case 'delete':
					return prevState.filter((pet) => pet.id !== payload);
				default:
					return prevState;
			}
		}
	);

	const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

	// Derived state
	const numberOfPets = optimisticPets.length;

	const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);

	// Actions
	const handleUpdateSelectedPedId = (id: string) => {
		setSelectedPetId(id);
	};

	// 1. Add pet to client-side state and server-side database
	const handleAddPet = async (petData: PetData) => {
		// 1.1 Add to state
		startTransition(() => {
			setOptimisticPets({ action: 'add', payload: petData });
		});

		// 1.2 Add to database
		const error = await createPet(petData);
		if (error) toast.error(error.message);
	};

	// 2. Edit pet in client-side state and server-side database
	const handleEditPet = async (id: string, petData: PetData) => {
		const validatedPetData = PetFormSchema.safeParse(petData);
		if (!validatedPetData.success) {
			return {
				message: 'Invalid pet data.',
			};
		}

		// 2.1 Edit pet in client-side state
		startTransition(() => {
			setOptimisticPets({
				action: 'edit',
				payload: { id, petData: validatedPetData.data },
			});
		});

		// 2.2 Edit pet in server-side database
		const error = await updatePet(id, validatedPetData.data);
		if (error) toast.error(error.message);
	};

	// 3. Delete pet in client-side state and server-side database
	const handleCheckoutPet = async (id: string) => {
		// 3.1 Delete pet in client-side state
		startTransition(() => {
			setOptimisticPets({ action: 'delete', payload: id });
		});

		// 3.2 Delete pet in server-side database
		const error = await deletePet(id);
		if (error) toast.error(error.message);

		setSelectedPetId(null);
	};

	return (
		<PetContext.Provider
			value={{
				pets: optimisticPets,
				numberOfPets,
				selectedPetId,
				handleUpdateSelectedPedId,
				selectedPet,
				handleAddPet,
				handleEditPet,
				handleCheckoutPet,
			}}>
			{children}
		</PetContext.Provider>
	);
}
