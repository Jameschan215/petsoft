'use server';

import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { sleep } from '@/lib/utils';
import { authSchema, PetFormSchema, PetIdSchema } from '@/lib/validations';
import { signIn, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/lib/server-utils';
import { createUser, fetchPetById } from '@/lib/data';
import { Prisma } from '@prisma/client';
import { AuthError } from 'next-auth';

// ----- Auth Actions -----

export async function signUp(prevState: unknown, formData: unknown) {
	await sleep(1000);

	// check formData's type
	if (!(formData instanceof FormData)) {
		return {
			message: 'Invalid form data.',
		};
	}

	// convert form data to object for zod
	const formDataObject = Object.fromEntries(formData.entries());

	// validate form data object
	const validatedFormData = authSchema.safeParse(formDataObject);
	if (!validatedFormData.success) {
		return {
			message: 'Invalid form data.',
		};
	}

	// extract email and password from validated form data
	const { email, password } = validatedFormData.data;

	// hash the password
	const hashedPassword = await bcrypt.hash(password, 10);

	// do the creating action
	try {
		await createUser(email, hashedPassword);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return {
					message: 'Email already exists.',
				};
			} else {
				return {
					message: 'Something went wrong.',
				};
			}
		}
		return {
			message: 'Could not create user.',
		};
	}
	redirect('/login');
}

export async function logIn(prevState: unknown, formData: unknown) {
	await sleep(1000);

	// check formData's type
	if (!(formData instanceof FormData)) {
		return {
			message: 'Invalid form data.',
		};
	}
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			if (error.type === 'CredentialsSignin') {
				return {
					message: 'Invalid credentials.',
				};
			} else {
				return {
					message: 'Something went wrong. Could not log in.',
				};
			}
		}

		// next.js redirects throws error, so we need to rethrow it
		throw error;
	}
}

export async function logOut() {
	await sleep(1000);
	await signOut({ redirectTo: '/' });
}

// ----- Pet Actions -----

export async function createPet(petData: unknown) {
	await sleep(2000);

	const session = await checkAuth();

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
			data: {
				...validatedPetData.data,
				user: { connect: { id: session.user?.id } },
			},
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

		// authentication check
		const session = await checkAuth();

		// Validate data form client
		const validatedPetId = PetIdSchema.safeParse(id);
		const validatedPetData = PetFormSchema.safeParse(petData);
		if (!validatedPetId.success || !validatedPetData.success) {
			return {
				message: 'Invalid pet data.',
			};
		}

		// authorization check
		const pet = await fetchPetById(validatedPetId.data);
		if (!pet) {
			return {
				message: 'Pet not found!',
			};
		}

		if (pet.userId !== session.user?.id) {
			return {
				message: 'Not authorized!',
			};
		}

		// database mutation
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

		// Step 1 - Authentication check
		const session = await checkAuth();

		// Step 2 - Validate data form client
		const validatedPetId = PetIdSchema.safeParse(id);
		if (!validatedPetId.success) {
			return {
				message: 'Invalid pet data.',
			};
		}

		// Step 3 - Authorization check (if the user owns the pet)
		const pet = await fetchPetById(validatedPetId.data);

		if (!pet) {
			return {
				message: 'Pet not found!',
			};
		}

		if (pet.userId !== session.user?.id) {
			return {
				message: 'Not authorized!',
			};
		}

		// Step 4 - Database mutation
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
