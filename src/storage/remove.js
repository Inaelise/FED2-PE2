/**
 * This will remove a key-value pair from the browser's localStorage.
 * @param {string} key - The key of the item to be removed from localStorage.
 */
export const remove = (key) => localStorage.removeItem(key);
