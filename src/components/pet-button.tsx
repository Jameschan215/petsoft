'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import CreateForm from './create-form';
import EditForm from './edit-form';
import { useState } from 'react';

type TPetButton = {
	actionType: 'add' | 'edit' | 'checkout';
	children: React.ReactNode;
	onClick?: () => void;
};
export default function PetButton({
	actionType,
	children,
	onClick,
}: TPetButton) {
	const [isOpen, setIsOpen] = useState(false);

	if (actionType === 'checkout') {
		return (
			<Button onClick={onClick} variant="secondary">
				{children}
			</Button>
		);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				{actionType === 'add' ? (
					<Button size="icon">
						<PlusIcon className="h-6 w-6" />
					</Button>
				) : (
					<Button variant="secondary">Edit</Button>
				)}
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{actionType === 'add' ? 'Add a new pet' : 'Edit a pet'}
					</DialogTitle>
				</DialogHeader>

				{/* Forms */}
				{actionType === 'add' ? (
					<CreateForm onSubmission={() => setIsOpen(false)} />
				) : (
					<EditForm onSubmission={() => setIsOpen(false)} />
				)}
			</DialogContent>
		</Dialog>
	);
}
