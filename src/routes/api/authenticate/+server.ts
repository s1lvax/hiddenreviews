import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

export const GET: RequestHandler = async () => {
	const options = {
		method: 'GET',
		url: 'https://api.themoviedb.org/3/authentication',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTc4ZDg0YTI5MDM5OGE4NWUzYWUxMzkxMGMzYzIwYyIsIm5iZiI6MTcyOTQ1NTcyMi43NTkzNjksInN1YiI6IjY3MTU1ZWMzYmQ5MWM4MzgyOWQ3MTNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W4OvMm3Hruiln2_885JaJl9s1gD4TI-3zDnXKW1TCQw'
		}
	};

	try {
		// Make the authentication request
		const response = await axios.request(options);
		const data = response.data;

		// Return the authentication token or session details
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error during authentication:', error);

		return new Response(JSON.stringify({ error: 'Failed to authenticate' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
