import { API_HOLIDAZE_PROFILES } from "../constants";
import { headers } from "../headers";
import { load } from "../../storage/load";

/**
 * Updates the user's profile with the provided data in the API.
 *
 * @param {Object} profileData - Profile data to be updated.
 * @param {boolean} profileData.venueManager - Venue manager status.
 * @param {Object} profileData.avatar - The avatar object.
 * @param {Object} profileData.banner - The banner object.
 * @returns {Promise<Object>} - The updated profile data.
 * @throws {Error} - Throws an error if API request fails.
 */
export async function updateProfile(profileData) {
  const activeUser = load("user");
  const options = {
    method: "PUT",
    headers: headers("application/json"),
    body: JSON.stringify(profileData),
  };

  const response = await fetch(
    `${API_HOLIDAZE_PROFILES}/${activeUser}`,
    options
  );
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.errors.map((error) => error.message).join("\r\n");
    throw new Error(errorMessage);
  }

  return json.data;
}
