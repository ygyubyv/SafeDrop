import { ref } from "vue";
import { loginRequest, myMSALObj } from "../azure/azure_msal/msalConfig";

const isAuthenticated = ref(false);

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
      await myMSALObj.logoutRedirect();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleRedirect = async () => {
    try {
      await myMSALObj.handleRedirectPromise();
      const accounts = myMSALObj.getAllAccounts();
      if (accounts.length <= 0) {
        return;
      }
      myMSALObj.setActiveAccount(accounts[0]);
      isAuthenticated.value = true;
    } catch (error) {
      console.error("Error in handle redirect", error);
    }
  };

  const getAccessToken = async () => {
    try {
      const response = await myMSALObj.acquireTokenSilent(loginRequest);
      return response.accessToken;
    } catch (error) {
      console.warn("Silent token acquisition failed. Trying popup...", error);
      try {
        const response = await myMSALObj.acquireTokenPopup(loginRequest);
        return response.accessToken;
      } catch (popupError) {
        console.error("Token acquisition failed:", popupError);
        return null;
      }
    }
  };

  return { isAuthenticated, login, logout, handleRedirect, getAccessToken };
};
