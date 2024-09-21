import { fetchPetsCount } from '@/lib/data';

// import { usePetContext } from '@/lib/hooks';

export default async function Stats() {
	const numberOfPets = await fetchPetsCount();

	return (
		<section className="text-center">
			<p className="text-2xl font-bold leading-6">{numberOfPets}</p>
			<p className="opacity-80">Current guests</p>
		</section>
	);
}
