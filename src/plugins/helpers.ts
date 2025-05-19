export const validateFileName = (fileName: string): string => {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) {
    return `${fileName}_${Date.now()}`;
  }

  const name = fileName.slice(0, dotIndex);
  const extension = fileName.slice(dotIndex);
  return `${name}_${Date.now()}${extension}`;
};
