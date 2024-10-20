import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { TMDB_AUTHENTICATION } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
	// Get the movieId from query parameters
	const movieId = url.searchParams.get('movieId');

	if (!movieId) {
		return new Response(JSON.stringify({ error: 'Movie ID is required' }), { status: 400 });
	}

	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TMDB_AUTHENTICATION}`
		}
	};

	try {
		const response = await axios.request(options);
		const data = response.data;

		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching movie details:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch movie details' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
