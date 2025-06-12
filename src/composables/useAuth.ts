import { ref } from "vue";
import { loginRequest, myMSALObj } from "../azure/azure_msal/msalConfig";

const isAuthenticated = ref(false);
const isInitialized = ref(false);

export const useAuth = () => {
  const login = async () => {
    try {
      if (!myMSALObj) {
        throw new Error("MSAL not initialized. Call initializeMsal() before using MSAL API");
      }
      await myMSALObj.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const logout = async () => {
    try {
      if (!myMSALObj) {
        throw new Error("MSAL not initialized. Call initializeMsal() before using MSAL API");
      }
      isAuthenticated.value = false;
      isInitialized.value = false;
      await myMSALObj.logoutRedirect();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const initAuth = async () => {
    if (isInitialized.value) return;
    try {
      await myMSALObj.handleRedirectPromise();
      const accounts = myMSALObj.getAllAccounts();
      if (accounts.length > 0) {
        myMSALObj.setActiveAccount(accounts[0]);
        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;
      }
    } catch (error) {
      console.error("Init auth error:", error);
      isAuthenticated.value = false;
    } finally {
      isInitialized.value = true;
    }
  };

  const getAccessToken = async () => {
    try {
      const response = await myMSALObj.acquireTokenSilent(loginRequest);
      return response.accessToken;
    } catch (error) {
      console.warn("Silent token acquisition failed:", error);
      return null;
    }
  };

  return { isAuthenticated, login, logout, initAuth, getAccessToken };
};
