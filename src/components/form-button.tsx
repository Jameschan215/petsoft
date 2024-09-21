import React from 'react';
import { Button } from './ui/button';

type TFormButtonProps = {
	children: React.ReactNode;
};

export default function FormButton({ children }: TFormButtonProps) {
	return (
		<Button type="submit" className="self-end">
			{children}
		</Button>
	);
}
