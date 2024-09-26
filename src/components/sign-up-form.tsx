'use client';

import { signUp } from '@/actions/actions';
import SignUpButton from './auth-form-button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useFormState } from 'react-dom';

export default function SignUpForm() {
	const [error, formAction] = useFormState(signUp, undefined);

	return (
		<form action={formAction} className="flex flex-col gap-y-2">
			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input id="email" name="email" type="email" required />
			</div>
			<div className="space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input id="password" name="password" type="password" required />
			</div>
			{error && <p className="my-1 text-sm text-red-500">{error.message}</p>}

			<SignUpButton>Sign Up</SignUpButton>
		</form>
	);
}
