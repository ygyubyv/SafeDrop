import { ref } from "vue";
import { loginRequest, myMSALObj } from "../azure/azure_msal/msalConfig";

const isAuthenticated = ref(false);
const isInitialized = ref(false);

export const useAuth = () => {
  const login = async () => {
    try {
      if (!myMSALObj) {
        throw new Error("MSAL не ініціалізовано");
      }
      await myMSALObj.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Помилка входу", error);
    }
  };

  const logout = async () => {
    try {
      if (!myMSALObj) {
        throw new Error("MSAL не ініціалізовано");
      }
      isAuthenticated.value = false;
      isInitialized.value = false;
      await myMSALObj.logoutRedirect();
    } catch (error) {
      console.error("Помилка виходу", error);
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
      console.error("Помилка авторизації, спробуйте ще раз:", error);
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
      console.warn("Не вдалося отримати токен:", error);
      return null;
    }
  };

  return { isAuthenticated, login, logout, initAuth, getAccessToken };
};
