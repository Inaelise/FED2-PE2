/**
 * This will save a key-value pair to the browser's localStorage.
 * @param {string} key - The key under which the value will be stored in localStorage.
 * @param {any} value - The value to be stored.
 */
export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
