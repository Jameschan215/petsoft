import { z } from 'zod';

/* ------------------------------------------------------------------------- */
// Pet form validation

export const PetIdSchema = z.string().cuid();

export const PetFormSchema = z.object({
	name: z
		.string({ invalid_type_error: "Please enter your pet's name." })
		.trim()
		.min(3)
		.max(100),
	ownerName: z
		.string({ invalid_type_error: 'Please enter your own name.' })
		.trim()
		.min(3)
		.max(100),
	imageUrl: z.union([
		z.literal(''),
		z.string().trim().url({ message: 'Image url must be a valid url.' }),
	]),
	age: z.coerce.number().int().positive().max(99),
	notes: z.union([z.literal(''), z.string().trim().max(1000)]),
});

export type TPetForm = z.infer<typeof PetFormSchema>;

/* ------------------------------------------------------------------------- */
// Auth form validation

export const authSchema = z.object({
	email: z.string().email().max(20),
	password: z.string().max(20),
});

// Auth form validation

export type TAuth = z.infer<typeof authSchema>;
