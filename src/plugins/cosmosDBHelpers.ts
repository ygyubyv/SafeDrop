import { showNotification } from "./helpers";
import { useAuth } from "@/composables/useAuth";

const { getAccessToken } = useAuth();

export const decreaseDownloadAttempts = async (fileId: string) => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("У вас немає доступу для цієї дії");
    }
    await fetch(`http://localhost:7071/api/decreaseAttempts?id=${fileId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(`Помилка при зменшенні кількості спроб завантаження файлу, ${error}`);
    showNotification("error", "Не вдалося зменшити кількість спроб завантаження файлу");
  }
};
