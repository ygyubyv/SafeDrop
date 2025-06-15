import { app, InvocationContext } from "@azure/functions";
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { CosmosClient } from "@azure/cosmos";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
const cosmosConnection = process.env.COSMOS_DB_CONNECTION_STRING!;
const cosmosDbName = "safe-drop";
const cosmosContainerName = "metadata";
const blobContainerName = "safe-drop";

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

const cosmosClient = new CosmosClient(cosmosConnection);

type MetadataDocument = {
  id: string;
  fileName: string;
  downloadAttempts: number;
  size: number;
  uploadedAt: number;
  expiresAt: number;
};

export async function cosmosDbDeleteBlobOnAttemptsZero(
  documents: MetadataDocument[],
  context: InvocationContext
): Promise<void> {
  if (!documents || documents.length === 0) return;

  for (const doc of documents) {
    const downloadAttempts = doc.downloadAttempts;
    const fileName = doc.fileName;
    const id = doc.id;

    if (downloadAttempts === 0 && fileName && id) {
      context.log(`Document ${id} has 0 attempts — deleting...`);

      try {
        const blobClient = blobServiceClient
          .getContainerClient(blobContainerName)
          .getBlobClient(fileName);
        await blobClient.deleteIfExists();
        context.log(`File ${fileName} was deleted out of Blob Storage`);

        const container = cosmosClient.database(cosmosDbName).container(cosmosContainerName);
        await container.item(id, id).delete();
        context.log(`Document ${id} was deleted out of Cosmos DB`);
      } catch (err) {
        context.error(`Error ${fileName}:`, err);
      }
    }
  }
}

app.cosmosDB("cosmosDbDeleteBlobOnAttemptsZero", {
  connection: "COSMOS_DB_CONNECTION_STRING",
  databaseName: "safe-drop",
  containerName: "metadata",
  leaseContainerName: "leases",
  createLeaseContainerIfNotExists: true,
  handler: cosmosDbDeleteBlobOnAttemptsZero,
});
