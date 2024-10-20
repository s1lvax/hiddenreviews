<script>
	import MovieProfile from '$lib/components/MovieProfile.svelte';
	import { page } from '$app/stores';
	const { movieId } = $page.params;
</script>

<MovieProfile {movieId} />
