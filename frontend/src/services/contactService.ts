/**
 * Contact page service
 * Endpoints: GET /api/contact/, POST /api/contact/submit
 */

import { apiGet, apiPost } from './apiClient';

export interface ContactData {
  page: string;
  status: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

/**
 * Get contact page data (placeholder GET only)
 * @returns Contact page data object
 */
export async function getContactData(): Promise<ContactData> {
  return apiGet<ContactData>('/api/contact/');
}

/**
 * Submit contact form
 * @param formData - Contact form data
 * @returns Response with success status and message
 */
export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
  return apiPost<ContactFormResponse>('/api/contact/submit', formData);
}
