import { z } from 'zod';

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
