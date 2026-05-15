/**
 * API Constants
 * Following the requirement to use constants for URLS.
 */
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch latest entries (simulated using posts from JSONPlaceholder).
 * 
 * @returns {Promise<Array>} List of entries.
 */
export const fetchLatestEntries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?_limit=10`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Re-throwing error to be handled by the component
    throw new Error('Failed to fetch entries. Please check your connection.');
  }
};
