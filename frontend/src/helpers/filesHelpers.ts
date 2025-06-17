import axiosInstance from "@/plugins/axios";
import { handleFetchErrors } from "./handleFetchErrors";
import { handleAxiosError } from "./handleAxiosError";

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
  const kilobytes = size / 1024;
  const megabytes = kilobytes / 1024;
  return megabytes >= 1 ? `${megabytes.toFixed(2)} MB` : `${kilobytes.toFixed(2)} KB`;
};

export const uploadSasToken = async (fileName: string, ttl: number, size: number) => {
  try {
    const { data } = await axiosInstance.get(
      `/getUploadSasToken?filename=${validateFileName(fileName)}&size=${size}&ttl=${ttl}`
    );
    const { url, id } = data;
    return { url, id };
  } catch (error) {
    handleAxiosError(error);
  }
};

export const downloadSasToken = async (fileName: string) => {
  try {
    const { data } = await axiosInstance.get(`/getDownloadSasToken?filename=${fileName}`);
    return data.url;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const uploadBlob = async (url: string, file: File | Blob) => {
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
