'use client';

import { logOut } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';

export default function SignOutButton() {
	// if you use form, you use useFormStatus to get pending effect
	// if you use onClick, you use useTransition to do it
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			disabled={isPending}
			onClick={async () => {
				startTransition(async () => {
					logOut();
				});
			}}>
			Sign out
		</Button>
	);
}
