import axios from "axios";

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message || "Невідома помилка Axios";
    console.error("Axios error:", message);
  } else {
    console.error("Unknown error:", error);
  }
};
