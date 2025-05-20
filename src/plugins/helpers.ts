export const validateFileName = (fileName: string): string => {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) {
    return `${fileName}_${Date.now()}`;
  }

  const name = fileName.slice(0, dotIndex);
  const extension = fileName.slice(dotIndex);
  return `${name}_${Date.now()}${extension}`;
};

export const loadSasToken = async (fileName: string) => {
  try {
    const response = await fetch(
      `http://localhost:7071/api/generateSasToken?filename=${validateFileName(fileName)}`
    );

    const { url } = await response.json();

    return url;
  } catch (error) {
    console.error(error);
  }
};

export const uploadBlob = async (url: string, file: File) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "x-ms-blob-type": "BlockBlob" },
      body: file,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
