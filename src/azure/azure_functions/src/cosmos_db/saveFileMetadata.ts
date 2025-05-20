import { db } from "./cosmosClient";

interface FileMetadata {
  id: string;
  fileName: string;
  url: string;
  uploadedAt: number;
}

export async function saveFileMetadata(metadata: FileMetadata) {
  const { resource } = await db.items.create(metadata);
  return resource;
}
