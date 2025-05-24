import { handleFetchErrors, showNotification } from "./helpers";

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

export const uploadSasToken = async (fileName: string, size: number) => {
  try {
    const response = await fetch(
      `http://localhost:7071/api/generateSasToken?filename=${validateFileName(
        fileName
      )}&size=${size}&type=upload`
    );

    await handleFetchErrors(response);
    const { url, id } = await response.json();
    return { url, id };
  } catch (error) {
    console.error("Помилка при отриманні upload SAS URL:", error);
    showNotification("error", `Помилка при отриманні upload SAS URL: ${error}`);
  }
};

export const downloadSasToken = async (fileName: string) => {
  try {
    const response = await fetch(
      `http://localhost:7071/api/generateSasToken?filename=${fileName}&type=download`
    );

    await handleFetchErrors(response);
    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error("Помилка при отриманні download SAS URL:", error);
    showNotification("error", `Помилка при отриманні download SAS URL: ${error}`);
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
    showNotification("error", `Помилка при завантаженні blob: ${error}`);
  }
};

export const downloadBlob = async (url: string): Promise<Blob> => {
  try {
    const response = await fetch(url);
    await handleFetchErrors(response);
    return await response.blob();
  } catch (error) {
    console.error("Failed to download blob:", error);
    showNotification("error", `Failed to download blob: ${error}`);
    throw error;
  }
};
