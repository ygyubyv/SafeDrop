import { db } from "./cosmosClient";

interface FileMetadata {
  id: string;
  fileName: string;
  size: number;
  uploadedAt: number;
  expiresAt: number;
  ttl: number;
}

export async function saveFileMetadata(metadata: FileMetadata) {
  const { resource } = await db.items.create(metadata);
  return resource;
}
