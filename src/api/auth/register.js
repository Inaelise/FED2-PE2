import { headers } from "../headers";
import { API_AUTH_REGISTER } from "../constants";

/**
 * Registers a new user by sending their details to the API.
 *
 * @param {Object} params - The registration details.
 * @param {boolean} venueManager - Venue manager status.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The registered user data.
 * @throws {Error} If the registration fails, an error message is thrown.
 * @example
 * const register = await registerUser({ venueManager: true, name: "Kari", email: "kari@stud.noroff.no", password: "password123" });
 * console.log(register);
 */
export async function registerUser({ venueManager, name, email, password }) {
  const options = {
    method: "POST",
    headers: headers("application/json"),
    body: JSON.stringify({ venueManager, name, email, password }),
  };

  const response = await fetch(API_AUTH_REGISTER, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.errors.map((error) => error.message).join("\r\n");
    throw new Error(errorMessage);
  }

  return json.data;
}
