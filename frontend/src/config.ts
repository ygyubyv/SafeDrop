export const msalConfig = {
  clientID: import.meta.env.VITE_MSAL_CLIENT_ID,
  tenantID: import.meta.env.VITE_MSAL_TENANT_ID,
  tenantName: import.meta.env.VITE_MSAL_TENANT_NAME,
  policyName: import.meta.env.VITE_MSAL_POLICY_NAME,
  redirectURI: import.meta.env.VITE_MSAL_REDIRECT_URI,
};

export const backendURL = import.meta.env.VITE_BACKEND_API_URL;
