/**
 * Health check service
 * Endpoint: GET /api/health
 */

import { apiGet } from './apiClient';

export interface HealthStatus {
  status: string;
  service: string;
  mode: string;
}

/**
 * Get backend health status
 * @returns Health status object
 */
export async function getHealthStatus(): Promise<HealthStatus> {
  return apiGet<HealthStatus>('/api/health');
}
