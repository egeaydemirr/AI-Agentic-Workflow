/**
 * Application configuration
 * Centralized place for environment variables and app constants
 */

export const CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.example.com',
  API_TIMEOUT: 30000,
  ENABLE_LOGS: __DEV__,
} as const;

export default CONFIG;
