import ContentBlock from '@/components/content-block';
import CustomH1 from '@/components/custom-h1';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
	return (
		<main>
			<CustomH1 className="my-8 text-white">Your Account</CustomH1>

			<ContentBlock className="h-[500px] flex flex-col items-center justify-center gap-y-4">
				<p>Logged in as JohnDoe@example.com</p>

				<Button asChild>
					<Link href="/signout">Sign out</Link>
				</Button>
			</ContentBlock>
		</main>
	);
}
