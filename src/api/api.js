const API_BASE_URL = 'https://api.piwpiw.com/v1'; // Replace with your actual API URL

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    // Add Authorization header if needed, e.g., from localStorage
    // 'Authorization': `Bearer ${localStorage.getItem('piwpiw-token')}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

export const api = {
  getCommands: () => request('/commands'),
  getStats: () => request('/stats'),
  uploadAvatar: (userId, file) => { /* ... implementation for file upload ... */ },
  // Add other API functions here
};