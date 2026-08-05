/**
 * Theme service for syncing theme preference with backend
 * Endpoint: GET /api/theme, POST /api/theme
 */

import { apiGet, apiPost } from './apiClient';

export interface ThemePreference {
  theme: 'light' | 'dark';
}

/**
 * Get theme preference from backend
 * @returns Theme preference object
 */
export async function getThemePreference(): Promise<ThemePreference> {
  try {
    return await apiGet<ThemePreference>('/api/theme');
  } catch (error) {
    // If backend is unavailable, return default
    console.warn('Failed to fetch theme preference from backend:', error);
    return { theme: 'dark' };
  }
}

/**
 * Save theme preference to backend
 * @param theme - Theme value ('light' or 'dark')
 * @returns Updated theme preference
 */
export async function saveThemePreference(theme: 'light' | 'dark'): Promise<ThemePreference> {
  try {
    return await apiPost<ThemePreference>('/api/theme', { theme });
  } catch (error) {
    // Fail gracefully - theme will still work locally
    console.warn('Failed to save theme preference to backend:', error);
    return { theme };
  }
}
