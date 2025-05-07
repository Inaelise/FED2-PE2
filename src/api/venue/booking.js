import { headers } from "../headers";
import { API_HOLIDAZE_BOOKINGS } from "../api/constants";

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
