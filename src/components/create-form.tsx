'use client';

import React from 'react';
import FormButton from './form-button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { addPet } from '@/actions/actions';
import { toast } from 'sonner';

export default function CreateForm({
	onSubmission,
}: {
	onSubmission: () => void;
}) {
	// handle submit action
	// function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
	// 	event.preventDefault();

	// 	const formData = new FormData(event.currentTarget);
	// 	const pet = {
	// 		name: formData.get('name') as string,
	// 		ownerName: formData.get('ownerName') as string,
	// 		imageUrl: (formData.get('imageUrl') as string) || defaultImage,
	// 		age: +(formData.get('age') as string),
	// 		notes: formData.get('notes') as string,
	// 	} as Pet;

	// 	handleAddPet(pet);
	// 	onSubmission();
	// }

	return (
		<form
			action={async (formData) => {
				const error = await addPet(formData);
				if (error) toast.error(error.message);
				onSubmission();
			}}
			className="flex flex-col gap-y-4">
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input id="name" name="name" type="text" required />
			</div>
			<div className="space-y-1">
				<Label htmlFor="ownerName">Owner Name</Label>
				<Input id="ownerName" name="ownerName" type="text" required />
			</div>
			<div className="space-y-1">
				<Label htmlFor="imageUrl">Image Url</Label>
				<Input id="imageUrl" name="imageUrl" type="text" />
			</div>
			<div className="space-y-1">
				<Label htmlFor="age">Age</Label>
				<Input id="age" name="age" type="number" required />
			</div>
			<div className="space-y-1">
				<Label htmlFor="notes">Notes</Label>
				<Textarea id="notes" name="notes" rows={3} />
			</div>
			<FormButton>Add</FormButton>
		</form>
	);
}
