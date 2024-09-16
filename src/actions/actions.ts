'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';

export async function addPet(petData) {
	try {
		await sleep(2000);

		await prisma.pet.create({
			data: petData,
		});
	} catch (error) {
		return {
			message: 'Could not add pet.',
		};
	}

	revalidatePath('/app', 'layout');
}

export async function updatePet(id, petData) {
	try {
		await sleep(2000);

		await prisma.pet.update({
			where: { id: id },
			data: petData,
		});
	} catch (error) {
		return {
			message: 'Cannot update pet.',
		};
	}

	revalidatePath('/app', 'layout');
}

export async function deletePet(id: string) {
	try {
		await sleep(2000);

		await prisma.pet.delete({
			where: { id: id },
		});
	} catch (error) {
		return {
			message: 'Cannot delete pet.',
		};
	}

	revalidatePath('/app', 'layout');
}
