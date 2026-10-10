/**
 * Production API endpoint.
 *
 * This is baked into the bundle at build time, so it cannot come from a runtime
 * env var. When the backend service is renamed or moved to a custom domain this
 * has to be updated and the site redeployed.
 */
export const environment = {
  production: true,
  apiUrl: 'https://suivi-back-api.onrender.com',
  restUrl: 'https://suivi-back-api.onrender.com'
};