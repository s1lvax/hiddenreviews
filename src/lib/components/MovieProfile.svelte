<script lang="ts">
	import { Calendar, Star } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let movieId: string; // Movie ID passed as a prop
	let movieDetails: any = {}; // Store the movie details
	let errorMessage = '';
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for movie posters
	const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'; // Base URL for movie backdrops

	onMount(async () => {
		try {
			const response = await fetch(`/api/movies/findDetailsById?movieId=${movieId}`);
			if (response.status !== 200) {
				throw new Error('Failed to fetch movie details');
			}
			movieDetails = await response.json();
		} catch (error) {
			console.error(error);
			errorMessage = 'Error fetching movie details';
		}
	});
</script>
