/**
 * Centralized API client for backend communication
 * Handles base URL configuration and common fetch operations
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Generic GET request handler
 * @param path - API endpoint path (e.g., '/api/health')
 * @returns Promise with parsed JSON response
 */
export async function apiGet<T = unknown>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // Re-throw with context for better error handling upstream
    throw new Error(`Failed to fetch ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generic POST request handler
 * @param path - API endpoint path
 * @param data - Request body data
 * @returns Promise with parsed JSON response
 */
export async function apiPost<T = unknown>(path: string, data: unknown): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to POST ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
