import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { TMDB_AUTHENTICATION } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
	// Retrieve the query parameters from the request URL
	const query = url.searchParams.get('query');
	const include_adult = url.searchParams.get('include_adult') || 'false';
	const primary_release_year = url.searchParams.get('primary_release_year') || '';
	const region = url.searchParams.get('region') || '';
	const year = url.searchParams.get('year') || '';

	// Validate that 'query' is provided
	if (!query) {
		return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Create the API request options
	const apiUrl = 'https://api.themoviedb.org/3/search/movie';

	const options = {
		method: 'GET',
		url: apiUrl,
		params: {
			query,
			include_adult,
			primary_release_year,
			region,
			year,
			language: 'en-US',
			page: 1
		},
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TMDB_AUTHENTICATION}` // Use your actual bearer token
		}
	};

	try {
		// Make the API request using Axios
		const response = await axios.request(options);
		const data = response.data;

		// Return the movie data as JSON
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching movie data:', error);

		return new Response(JSON.stringify({ error: 'Failed to fetch movie data' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
