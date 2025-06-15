import axios, { AxiosError } from "axios";

import { useAuth } from "@/composables/useAuth";

import { backendURL } from "@/config";
import { showNotification } from "@/helpers/showNotification";

const { getAccessToken } = useAuth();

const axiosInstance = axios.create({
  baseURL: backendURL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    showNotification("error", "У вас немає доступу для цієї дії");
  }

  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    let message = "Невідома помилка";
    const status = error.response?.status;

    if (error.response?.data && typeof error.response.data === "object") {
      message = JSON.stringify(error.response.data);
    } else if (error.message) {
      message = error.message;
    }

    console.error("Axios error:", error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
