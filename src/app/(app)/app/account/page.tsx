import ContentBlock from '@/components/content-block';
import CustomH1 from '@/components/custom-h1';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/sign-out-button';

export default async function Page() {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	return (
		<main>
			<CustomH1 className="my-8 text-white">Your Account</CustomH1>

			<ContentBlock className="h-[500px] flex flex-col items-center justify-center gap-y-4">
				<p>
					Logged in as <span className="font-bold">{session.user.email}</span>
				</p>
				<SignOutButton />
			</ContentBlock>
		</main>
	);
}
