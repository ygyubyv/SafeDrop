import { handleFetchErrors, showNotification } from "./helpers";
import { useAuth } from "@/composables/useAuth";

const { getAccessToken } = useAuth();

export const validateFileName = (fileName: string): string => {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) {
    return `${fileName}_${Date.now()}`;
  }

  const name = fileName.slice(0, dotIndex);
  const extension = fileName.slice(dotIndex);
  return `${name}_${Date.now()}${extension}`;
};

export const formatFileSize = (size: number): string => {
  const kylobytes = size / 1024;
  const megabytes = kylobytes / 1024;
  return megabytes >= 1 ? `${megabytes.toFixed(2)} MB` : `${kylobytes.toFixed(2)} KB`;
};

export const uploadSasToken = async (fileName: string, ttl: number, size: number) => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("У вас немає доступу для цієї дії");
    }
    const response = await fetch(
      `http://localhost:7071/api/getUploadSasToken?filename=${validateFileName(
        fileName
      )}&size=${size}&ttl=${ttl}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    await handleFetchErrors(response);
    const { url, id } = await response.json();
    return { url, id };
  } catch (error) {
    console.error("Помилка при отриманні upload SAS URL:", error);
  }
};

export const downloadSasToken = async (fileName: string) => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("У вас немає доступу для цієї дії");
    }
    const response = await fetch(
      `http://localhost:7071/api/getDownloadSasToken?filename=${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    await handleFetchErrors(response);
    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error("Помилка при отриманні download SAS URL:", error);
  }
};

export const uploadBlob = async (url: string, file: File) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "x-ms-blob-type": "BlockBlob" },
      body: file,
    });

    await handleFetchErrors(response);
    return response;
  } catch (error) {
    console.error("Помилка при завантаженні blob:", error);
  }
};

export const downloadBlob = async (url: string): Promise<Blob> => {
  try {
    const response = await fetch(url);
    await handleFetchErrors(response);
    return await response.blob();
  } catch (error) {
    console.error("Помилка при завантаженні blob:", error);
    throw error;
  }
};
