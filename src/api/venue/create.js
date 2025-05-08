import { API_HOLIDAZE_VENUES } from "../constants";
import { headers } from "../headers";

/**
 * Sends a request to the API to create a new venue.
 *
 * @param {Object} data - The venue data to be sent to the API.
 * @returns {Object} - The data for the created venue is returned.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function createVenue(data) {
  const options = {
    method: "POST",
    headers: headers("application/json"),
    body: JSON.stringify(data),
  };

  const response = await fetch(API_HOLIDAZE_VENUES, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.errors.map((error) => error.message).join("\r\n");
    throw new Error(errorMessage);
  }

  return json.data;
}
