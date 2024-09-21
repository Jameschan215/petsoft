import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import FormButton from './form-button';
import { usePetContext } from '@/lib/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PetFormSchema, TPetForm } from '@/lib/validations';
import { DEFAULT_IMAGE_URL } from '@/lib/constants';

export default function EditForm({
	onSubmission,
}: {
	onSubmission: () => void;
}) {
	const { selectedPet, handleEditPet } = usePetContext();
	const {
		register,
		trigger,
		getValues,
		formState: { errors },
	} = useForm<TPetForm>({
		resolver: zodResolver(PetFormSchema),
		defaultValues: {
			name: selectedPet?.name,
			ownerName: selectedPet?.ownerName,
			imageUrl: selectedPet?.imageUrl,
			age: selectedPet?.age,
			notes: selectedPet?.notes,
		},
	});

	return (
		<form
			action={async () => {
				const passed = await trigger();
				if (!passed) return;

				const petData = getValues();
				petData.imageUrl = petData.imageUrl || DEFAULT_IMAGE_URL;
				onSubmission();
				await handleEditPet(selectedPet!.id, petData);
			}}
			className="flex flex-col gap-y-4">
			<div>
				<div className="space-y-1">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						aria-describedby="name-error"
						{...register('name')}
						// defaultValue={selectedPet?.name}
					/>
				</div>
				<div id="name-error" aria-live="polite" aria-atomic="true">
					{errors.name && (
						<p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
					)}
				</div>
			</div>
			<div>
				<div className="space-y-1">
					<Label htmlFor="ownerName">Owner Name</Label>
					<Input
						id="ownerName"
						{...register('ownerName')}
						aria-describedby="ownerName-error"
						// defaultValue={selectedPet?.ownerName}
					/>
				</div>
				<div id="ownerName-error" aria-live="polite" aria-atomic="true">
					{errors.ownerName && (
						<p className="mt-2 text-sm text-red-500">
							{errors.ownerName.message}
						</p>
					)}
				</div>
			</div>

			<div>
				<div className="space-y-1">
					<Label htmlFor="imageUrl">Image Url</Label>
					<Input
						id="imageUrl"
						{...register('imageUrl')}
						aria-describedby="imageUrl-error"
						// defaultValue={selectedPet?.imageUrl}
					/>
				</div>
				<div id="imageUrl-error" aria-live="polite" aria-atomic="true">
					{errors.imageUrl && (
						<p className="mt-2 text-sm text-red-500">
							{errors.imageUrl.message}
						</p>
					)}
				</div>
			</div>
			<div>
				<div className="space-y-1">
					<Label htmlFor="age">Age</Label>
					<Input
						id="age"
						{...register('age')}
						aria-describedby="age-error"
						// defaultValue={selectedPet?.age}
					/>
				</div>
				<div id="age-error" aria-live="polite" aria-atomic="true">
					{errors.age && (
						<p className="mt-2 text-sm text-red-500">{errors.age.message}</p>
					)}
				</div>
			</div>
			<div>
				<div className="space-y-1">
					<Label htmlFor="notes">Notes</Label>
					<Textarea
						id="notes"
						{...register('notes')}
						rows={3}
						aria-describedby="notes-error"
						// defaultValue={selectedPet?.notes}
					/>
				</div>
				<div id="notes-error" aria-live="polite" aria-atomic="true">
					{errors.notes && (
						<p className="mt-2 text-sm text-red-500">{errors.notes.message}</p>
					)}
				</div>
			</div>
			<FormButton>Edit</FormButton>
		</form>
	);
}
