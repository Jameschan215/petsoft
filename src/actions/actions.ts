'use server';

import { revalidatePath } from 'next/cache';
// import { Pet } from '@prisma/client';
import prisma from '@/lib/db';

export async function addPet(pet) {
	try {
		await prisma.pet.create({
			data: pet,
		});
	} catch (error) {
		return {
			message: 'Cannot add pet to database.',
		};
	}

	revalidatePath('/app', 'layout');
}

/*
export async function updatePet(id, formData) {
	try {
		console.log('Start updating...');
		await sleep(3000);

		await prisma.pet.update({
			where: { id: id },
			data: {
				name: formData.get('name'),
				ownerName: formData.get('ownerName'),
				age: parseInt(formData.get('age')),
				imageUrl: formData.get('imageUrl') || defaultImage,
				notes: formData.get('notes'),
			},
		});
	} catch (error) {
		return {
			message: 'Cannot update pet in database.',
		};
	}
	console.log('Finish updating.');

	revalidatePath('/app', 'layout');
	redirect('/app/dashboard');
}

export async function deletePet(id: string) {
	try {
		await sleep(3000);

		await prisma.pet.delete({
			where: { id: id },
		});
	} catch (error) {
		return {
			message: 'Cannot delete pet in database.',
		};
	}

	revalidatePath('/app', 'layout');
	redirect('/app/dashboard');
}
*/
