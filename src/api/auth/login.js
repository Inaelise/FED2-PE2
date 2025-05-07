import { headers } from "../headers";
import { API_AUTH_LOGIN } from "../constants";

/**
 * Sends login credentials to the API and returns the user data.
 *
 * @param {Object} credentials - The login credentials.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The logged-in user data.
 * @throws {Error} If the login fails, an error message is thrown.
 */
export async function loginUser({ email, password }) {
  const options = {
    method: "POST",
    headers: headers("application/json"),
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(`${API_AUTH_LOGIN}?_holidaze=true`, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.errors.map((error) => error.message).join("\r\n");
    throw new Error(errorMessage);
  }

  return json.data;
}
