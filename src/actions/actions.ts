'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { PetFormSchema, PetIdSchema } from '@/lib/validations';

export async function createPet(petData: unknown) {
	await sleep(2000);

	// Validate data form client
	const validatedPetData = PetFormSchema.safeParse(petData);
	if (!validatedPetData.success) {
		return {
			message: 'Invalid pet data.',
		};
	}

	// Insert data into the database
	try {
		await prisma.pet.create({
			data: validatedPetData.data,
		});
	} catch (error) {
		// If a database error occurs, return a more specific error.
		return {
			message: 'Database Error: Failed to Create Pet.',
		};
	}

	revalidatePath('/app', 'layout');
}

export async function updatePet(id: unknown, petData: unknown) {
	try {
		await sleep(2000);

		// Validate data form client
		const validatedPetId = PetIdSchema.safeParse(id);
		const validatedPetData = PetFormSchema.safeParse(petData);
		if (!validatedPetId.success || !validatedPetData.success) {
			return {
				message: 'Invalid pet data.',
			};
		}

		await prisma.pet.update({
			where: { id: validatedPetId.data },
			data: validatedPetData.data,
		});
	} catch (error) {
		return {
			message: 'Database Error: Failed to update pet.',
		};
	}

	revalidatePath('/app', 'layout');
}

export async function deletePet(id: unknown) {
	try {
		await sleep(2000);

		// Validate data form client
		const validatedPetId = PetIdSchema.safeParse(id);
		if (!validatedPetId.success) {
			return {
				message: 'Invalid pet data.',
			};
		}

		await prisma.pet.delete({
			where: { id: validatedPetId.data },
		});
	} catch (error) {
		return {
			message: 'Database Error: Failed to delete pet.',
		};
	}

	revalidatePath('/app', 'layout');
}
