<script lang="ts">
	export let movies = [];
	export let errorMessage = '';
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

	import { trimOverview } from '$lib/utils/trimOverview';
	import { Calendar, Star } from 'lucide-svelte';
</script>

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
							<p class="mt-2 text-gray-400">
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
