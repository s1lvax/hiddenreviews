<script lang="ts">
	import { onMount } from 'svelte';
	import Movies from './Movies.svelte';

	let movies = []; // Array to store the movie search results
	let errorMessage = '';

	// Check authentication on mount
	onMount(async () => {
		try {
			const authenticate = await fetch('/api/authenticate');
			if (authenticate.status != 200) {
				throw new Error('Not authenticated');
			}
		} catch (error) {
			errorMessage = 'Error during authentication';
			console.error(error);
		}
	});

	// Function to search for movies based on query
	const searchMovie = async (e: Event) => {
		e.preventDefault();
		const query = (e.target as HTMLFormElement)?.querySelector('input')?.value || '';

		try {
			const response = await fetch(`/api/movies/search?query=${query}`);
			const data = await response.json();
			movies = data.results; // Store the results in the movies array
		} catch (error) {
			errorMessage = 'Failed to fetch movie data';
			console.error(error);
		}
	};
</script>

<!-- Main design -->
<div class="bg-black">
	<div class="relative isolate overflow-hidden pt-14">
		<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
			<div class="text-center">
				<h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
					Find Your Favorite Movie
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-400">
					Explore the world of cinema and leave your anonymous mark.
				</p>

				<!-- Search form -->
				<form on:submit={searchMovie} class="mt-8">
					<input
						type="text"
						placeholder="Search by title..."
						required
						class="w-full rounded-md border border-gray-800 bg-transparent px-4 py-2 text-white sm:w-80"
					/>
					<button
						type="submit"
						class="mt-4 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:ml-4 sm:mt-0"
						>Search</button
					>
				</form>

				<!-- Error message display -->
				{#if errorMessage}
					<p class="mt-4 text-red-500">{errorMessage}</p>
				{/if}
			</div>
		</div>
	</div>
	<Movies {movies} />
</div>
