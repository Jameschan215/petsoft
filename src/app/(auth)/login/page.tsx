import CustomH1 from '@/components/custom-h1';
import LoginForm from '@/components/Login-form';
import Link from 'next/link';

export default function Page() {
	return (
		<main>
			<CustomH1 className="text-center mb-5">Log in</CustomH1>

			<LoginForm />

			<p className="mt-6 text-sm text-zinc-500">
				No account yet?{' '}
				<Link href="sign-up" className="font-medium">
					Sign up
				</Link>
			</p>
		</main>
	);
}
