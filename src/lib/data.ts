import { Pet } from './types';

export async function fetchPets() {
	const response = await fetch(
		'https://bytegrad.com/course-assets/projects/petsoft/api/pets'
	);

	if (!response.ok) {
		throw new Error('Could not fetch pets.');
	}

	const pets: Pet[] = await response.json();

	return pets;
}
