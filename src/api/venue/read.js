import { API_HOLIDAZE_VENUES } from "../constants";

/**
 * Fetches a paginated list of venues from the API.
 * If search query is provided, it fetched search results instead.
 *
 * @param {Object} params - Parameters for the API request.
 * @param {number} page - The page number to fetch (default is 1).
 * @param {string} query - The search query to filter venues (default is empty).
 * @returns {Promise<Object>} - The response data containing the list of venues.
 * @throws {Error} - Throws an error if the API request fails.
 * @example
 * const = { data, meta } = await getVenues({ page: 2, query: "spain" });
 */
export async function getVenues({ page = 1, query = "" }) {
  const baseUrl = query
    ? `${API_HOLIDAZE_VENUES}/search?q=${encodeURIComponent(query)}`
    : API_HOLIDAZE_VENUES;

  const url = new URL(baseUrl);
  url.searchParams.append("limit", 9);
  url.searchParams.append("page", page);
  url.searchParams.append("sort", "created");

  const response = await fetch(url);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
