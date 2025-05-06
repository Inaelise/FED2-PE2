import { API_HOLIDAZE_VENUES } from "../constants";

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
