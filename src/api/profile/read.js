import { API_HOLIDAZE_PROFILES } from "../constants";
import { headers } from "../headers";

/**
 * Fetches profile data from the API for a specified user including their bookings and venues.
 *
 * @param {string} username - The username of the profile to fetch.
 * @returns {Promise<Object>} - The user's profile data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function getProfile(username) {
  const url = `${API_HOLIDAZE_PROFILES}/${username}?_bookings=true&_venues=true`;

  const options = {
    method: "GET",
    headers: headers("application/json"),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.errors.map((error) => error.message).join("\r\n");
    throw new Error(errorMessage);
  }

  return json.data;
}
