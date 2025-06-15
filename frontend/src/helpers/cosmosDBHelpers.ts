import { showNotification } from "./showNotification";
import axiosInstance from "@/plugins/axios";

export const decreaseDownloadAttempts = async (fileId: string) => {
  try {
    await axiosInstance.patch(`/decreaseAttempts?id=${fileId}`);
  } catch (error) {
    console.error(`Помилка при зменшенні кількості спроб завантаження файлу:`, error);
    showNotification("error", "Не вдалося зменшити кількість спроб завантаження файлу");
  }
};
