import { API_HOLIDAZE_BOOKINGS } from "../constants";
import { headers } from "../headers";

/**
 * Sends a request to the API to delete a booking.
 *
 * @param {string} id - The ID of the booking to be deleted.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function deleteBooking(id) {
  const options = {
    method: "DELETE",
    headers: headers(),
  };

  const response = await fetch(`${API_HOLIDAZE_BOOKINGS}/${id}`, options);

  if (!response.ok) {
    throw new Error(`Failed to delete booking with id: ${id}.`);
  }

  if (response.status === 204) {
    return;
  }

  const data = await response.json();
  return data;
}
