'use client';

import { usePetContext } from '@/lib/hooks';
import { Pet } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

export default function PetDetails() {
	const { selectedPet } = usePetContext();

	return (
		<section className="w-full h-full flex flex-col">
			{!selectedPet && <EmptyView />}

			{selectedPet && (
				<>
					<TopBar pet={selectedPet} />
					<OtherInfo pet={selectedPet} />
					<Notes pet={selectedPet} />
				</>
			)}
		</section>
	);
}

function EmptyView() {
	return (
		<div className="h-full flex items-center justify-center">
			<p className="text-2xl font-semibold">No pet selected.</p>
		</div>
	);
}

function TopBar({ pet }: { pet: Pet }) {
	return (
		<div className="flex items-center bg-white px-8 py-5 border-b border-light">
			<Image
				src={pet.imageUrl}
				width={75}
				height={75}
				alt="Selected pet image"
				className="h-[75px] w-[75px] rounded-full object-cover"
			/>
			<h2 className="text-3xl font-semibold leading-7 ml-5">{pet.name}</h2>
		</div>
	);
}

function OtherInfo({ pet }: { pet: Pet }) {
	return (
		<div className="flex justify-around px-5 py-10 text-center">
			<div>
				<h3 className="text-[13px] font-medium uppercase text-zinc-700">
					Owner Name
				</h3>
				<p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>
			</div>

			<div>
				<div>
					<h3 className="text-[13px] font-medium uppercase text-zinc-700">
						Age
					</h3>
					<p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
				</div>
			</div>
		</div>
	);
}

function Notes({ pet }: { pet: Pet }) {
	return (
		<section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
			{pet.notes}
		</section>
	);
}
