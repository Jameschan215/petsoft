'use client';

import { logIn } from '@/actions/actions';
import { Input } from './ui/input';
import { Label } from './ui/label';
import AuthFormButton from './auth-form-button';
import { useFormState } from 'react-dom';

export default function LoginForm() {
	const [error, formAction] = useFormState(logIn, undefined);

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

			<AuthFormButton>Log In</AuthFormButton>
		</form>
	);
}
