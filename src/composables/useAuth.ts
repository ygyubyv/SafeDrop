import { ref } from "vue";
import { myMSALObj } from "@/msal/msalConfig";

const isAuthenticated = ref(false);

export const useAuth = () => {
  const login = async () => {
    try {
      if (!myMSALObj) {
        throw new Error("MSAL not initialized. Call initializeMsal() before using MSAL API");
      }
      await myMSALObj.loginRedirect();
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
      isAuthenticated.value = accounts.length > 0;
    } catch (error) {
      console.error("Error in handle redirect", error);
    }
  };

  return { isAuthenticated, login, logout, handleRedirect };
};
