import { Pet } from '@prisma/client';
import prisma from './db';

export async function fetchPets() {
	const pets: Pet[] = await prisma.pet.findMany();

	return pets;
}

export async function fetchPetsCount() {
	const petCount = await prisma.pet.count();
	return petCount;
}
