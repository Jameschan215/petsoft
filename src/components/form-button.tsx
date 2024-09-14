import React from 'react';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

type TFormButtonProps = {
	children: React.ReactNode;
};

export default function FormButton({ children }: TFormButtonProps) {
	const status = useFormStatus();

	return (
		<Button type="submit" className="self-end" disabled={status.pending}>
			{children}
		</Button>
	);
}
