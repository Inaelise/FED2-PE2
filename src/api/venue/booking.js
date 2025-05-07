import { headers } from "../headers";
import { API_HOLIDAZE_BOOKINGS } from "../constants";

/**
 * Sends a request to the API to create a booking.
 *
 * @param {Object} data - The booking data to be sent to the API.
 * @returns {Promise<Object>} - The created booking data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function createBooking(data) {
  const options = {
    method: "POST",
    headers: headers("application/json"),
    body: JSON.stringify(data),
  };

  const response = await fetch(API_HOLIDAZE_BOOKINGS, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.errors.map((error) => error.message).join("\r\n");
    throw new Error(errorMessage);
  }

  return json.data;
}
