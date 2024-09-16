'use client';

import React from 'react';
import FormButton from './form-button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { usePetContext } from '@/lib/hooks';
import { useForm } from 'react-hook-form';

type TCreateForm = {
	name: string;
	ownerName: string;
	imageUrl: string;
	age: number;
	notes: string;
};

export default function CreateForm({
	onSubmission,
}: {
	onSubmission: () => void;
}) {
	const { handleAddPet } = usePetContext();
	const {
		register,
		trigger,
		formState: { errors },
	} = useForm<TCreateForm>();

	return (
		<form
			action={async (formData) => {
				const result = await trigger();
				if (!result) return;

				onSubmission();
				await handleAddPet(formData);
			}}
			className="flex flex-col gap-y-4">
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					{...register('name', {
						required: 'Name is required.',
						minLength: {
							value: 3,
							message: 'Name must be at least 3 characters long.',
						},
						maxLength: {
							value: 20,
							message: 'Name must be less than 20 characters long.',
						},
					})}
				/>
				{errors.name && <p className="text-red-500">{errors.name.message}</p>}
			</div>

			<div className="space-y-1">
				<Label htmlFor="ownerName">Owner Name</Label>
				<Input
					id="ownerName"
					{...register('ownerName', {
						required: 'Owner name is required.',
						minLength: {
							value: 3,
							message: 'Owner name must be at least 3 characters long.',
						},
						maxLength: {
							value: 20,
							message: 'Owner name must be less than 20 characters long.',
						},
					})}
				/>
				{errors.ownerName && (
					<p className="text-red-500">{errors.ownerName.message}</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="imageUrl">Image Url</Label>
				<Input id="imageUrl" {...register('imageUrl')} />
				{errors.imageUrl && (
					<p className="text-red-500">{errors.imageUrl.message}</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="age">Age</Label>
				<Input id="age" {...register('age')} />
				{errors.age && <p className="text-red-500">{errors.age.message}</p>}
			</div>

			<div className="space-y-1">
				<Label htmlFor="notes">Notes</Label>
				<Textarea id="notes" rows={3} {...register('notes')} />
				{errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
			</div>

			<FormButton>Add</FormButton>
		</form>
	);
}
