import { db } from "./cosmosClient";

interface FileMetadata {
  id: string;
  fileName: string;
  size: number;
  downloadAttempts: number;
  uploadedAt: number;
  expiresAt: number;
}

export async function saveFileMetadata(metadata: FileMetadata) {
  const { resource } = await db.items.create(metadata);
  return resource;
}
