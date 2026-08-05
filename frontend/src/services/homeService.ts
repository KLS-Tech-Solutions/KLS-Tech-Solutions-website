/**
 * Home page service
 * Endpoint: GET /api/home/
 */

import { apiGet } from './apiClient';

export interface HomeData {
  page: string;
  status: string;
  message: string;
}

/**
 * Get home page data
 * @returns Home page data object
 */
export async function getHomeData(): Promise<HomeData> {
  return apiGet<HomeData>('/api/home/');
}
