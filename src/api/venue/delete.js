import { API_HOLIDAZE_VENUES } from "../constants";
import { headers } from "../headers";

export async function deleteVenue(id) {
  const options = {
    method: "DELETE",
    headers: headers(),
  };

  const response = await fetch(`${API_HOLIDAZE_VENUES}/${id}`, options);

  if (!response.ok) {
    throw new Error(`Failed to delete venue with id: ${id}.`);
  }

  if (response.status === 204) {
    return;
  }

  const data = await response.json();
  return data;
}
