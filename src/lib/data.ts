import 'server-only';
import { Pet, User } from '@prisma/client';
import prisma from './db';

// User related
export async function createUser(email: string, hashedPassword: string) {
	try {
		await prisma.user.create({
			data: {
				email,
				hashedPassword,
			},
		});
	} catch (error) {
		throw error;
	}
}

export async function fetchUserByEmail(email: User['email']) {
	try {
		return await prisma.user.findUnique({ where: { email: email } });
	} catch (error) {
		throw error;
	}
}

// Pet related

export async function fetchPetById(petId: Pet['id']) {
	try {
		const pet = await prisma.pet.findUnique({
			where: { id: petId },
		});
		return pet;
	} catch (error) {
		throw error;
	}
}

export async function fetchPetsByUserId(userId: User['id']) {
	try {
		return await prisma.pet.findMany({ where: { userId: userId } });
	} catch (error) {
		throw error;
	}
}

export async function fetchPetsCount(userId: string) {
	try {
		return await prisma.pet.count({ where: { userId: userId } });
	} catch (error) {
		throw error;
	}
}
