/**
 * This will get and parse the value associated with a given key from localStorage.
 * @param {string} key - The key of the item to retrieve from localStorage.
 * @returns {any|null} The parsed value from localStorage if available, or `null` if the item doesn't exist.
 */
export const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};
