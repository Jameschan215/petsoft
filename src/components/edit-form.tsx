import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { usePetContext } from '@/lib/hooks';
import FormButton from './form-button';

export default function EditForm({
	onSubmission,
}: {
	onSubmission: () => void;
}) {
	const { selectedPet, handleEditPet } = usePetContext();

	if (!selectedPet) return;

	return (
		<form
			action={async (formData) => {
				onSubmission();
				await handleEditPet(selectedPet.id, formData);
			}}
			className="flex flex-col gap-y-4">
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					name="name"
					type="text"
					defaultValue={selectedPet.name}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="ownerName">Owner Name</Label>
				<Input
					id="ownerName"
					name="ownerName"
					type="text"
					defaultValue={selectedPet.ownerName}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="imageUrl">Image Url</Label>
				<Input
					id="imageUrl"
					name="imageUrl"
					type="text"
					defaultValue={selectedPet.imageUrl}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="age">Age</Label>
				<Input
					id="age"
					name="age"
					type="number"
					defaultValue={selectedPet.age}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="notes">Notes</Label>
				<Textarea
					id="notes"
					name="notes"
					rows={3}
					defaultValue={selectedPet.notes}
				/>
			</div>
			<FormButton>Edit</FormButton>
		</form>
	);
}
