import { showNotification } from "./helpers";

export const decreaseDownloadAttempts = async (fileId: string) => {
  try {
    await fetch(`http://localhost:7071/api/decreaseAttempts?id=${fileId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`Помилка при зменшенні кількості спроб завантаження файлу, ${error}`);
    showNotification("error", "Помилка при зменшенні кількості спроб завантаження файлу");
  }
};
