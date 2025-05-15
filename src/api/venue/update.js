import { API_HOLIDAZE_VENUES } from "../constants";
import { headers } from "../headers";

/**
 * Sends a request to the API to update an existing venue.
 *
 * @param {string} id - The ID of the venue to be updated.
 * @param {Object} data - The updated venue data to be sent to the API.
 * @returns {Object} - The data for the updated venue is returned.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function updateVenue(id, data) {
  const options = {
    method: "PUT",
    headers: headers("application/json"),
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${API_HOLIDAZE_VENUES}/${id}?_owner=true&_bookings=true`,
    options
  );
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.errors.map((error) => error.message).join("\r\n");
    throw new Error(errorMessage);
  }

  return json.data;
}
