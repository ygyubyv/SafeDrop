import { showNotification } from "./helpers";
import { useAuth } from "@/composables/useAuth";

const { getAccessToken } = useAuth();

export const decreaseDownloadAttempts = async (fileId: string) => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("You have no access for this action");
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
    showNotification("error", "Помилка при зменшенні кількості спроб завантаження файлу");
  }
};
