export const trimOverview = (overview = '', wordLimit = 20) => {
	const words = overview.trim().split(/\s+/);

	return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : overview;
};
