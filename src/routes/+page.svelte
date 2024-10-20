<script lang="ts">
	import { trimOverview } from '$lib/utils/trimOverview';
	import { Calendar, Star } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let movies = []; // Array to store the movie search results
	let errorMessage = '';
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for movie posters

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

	<!-- Displaying movie results -->
	<div class="mx-auto max-w-7xl p-6">
		{#if movies.length > 0}
			<div class="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
				{#each movies as movie}
					<a href="/movie/{movie.id}">
						<div
							class="movie-card transform overflow-hidden rounded-lg border border-gray-800 bg-transparent transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:border-white"
						>
							{#if movie.poster_path}
								<img
									src={IMAGE_BASE_URL + movie.poster_path}
									alt={movie.title}
									class="h-[500px] w-full object-cover grayscale hover:grayscale-0"
								/>
							{:else}
								<img
									src="/path/to/default-image.jpg"
									alt="No poster available"
									class="h-80 w-full object-cover grayscale hover:grayscale-0"
								/>
							{/if}
							<div class="flex flex-col gap-4 p-4">
								<h3 class="text-2xl font-bold text-white">{movie.title}</h3>
								<div class="flex flex-row items-center gap-4 text-sm text-gray-400">
									<div class="release-date flex flex-row items-center gap-2">
										<Calendar />
										{movie.release_date}
									</div>
									<div class="rating flex flex-row items-center gap-2">
										<Star />
										{movie.vote_average} ({movie.vote_count} votes)
									</div>
								</div>
								<p class="mt-2 text-gray-300">
									{movie.overview ? trimOverview(movie.overview) : 'No overview available'}
								</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}

		<!-- No movies message -->
		{#if movies.length === 0 && !errorMessage}
			<p class="mt-8 text-center text-gray-300">No results to display.</p>
		{/if}
	</div>
</div>
