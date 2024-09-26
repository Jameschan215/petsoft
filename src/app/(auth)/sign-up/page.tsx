import CustomH1 from '@/components/custom-h1';
import SignUpForm from '@/components/sign-up-form';
import Link from 'next/link';

export default function Page() {
	return (
		<main>
			<CustomH1 className="text-center mb-5">Sign Up</CustomH1>
			<SignUpForm />
			<p className="mt-6 text-sm text-zinc-500">
				Already have an account?{' '}
				<Link href="login" className="font-medium">
					Log in
				</Link>
			</p>
		</main>
	);
}
