import { app, InvocationContext, Timer } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
const cosmosConnection = process.env.COSMOS_DB_CONNECTION_STRING!;
const databaseName = "safe-drop";
const containerName = "metadata";
const containerStorage = "safe-drop";

export async function timerDeleteExpiredBlobs(
  timer: Timer,
  context: InvocationContext
): Promise<void> {
  const now = Date.now();
  const cosmosClient = new CosmosClient(cosmosConnection);
  const container = cosmosClient.database(databaseName).container(containerName);

  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );
  const blobContainerClient = blobServiceClient.getContainerClient(containerStorage);

  const query = {
    query: "SELECT * FROM c WHERE c.expiresAt <= @now",
    parameters: [{ name: "@now", value: now }],
  };

  const { resources } = await container.items.query(query).fetchAll();

  context.log(`Found documents to delete: ${resources.length}`);

  for (const doc of resources) {
    try {
      const blobClient = blobContainerClient.getBlobClient(doc.fileName);
      await blobClient.deleteIfExists();
      context.log(`File ${doc.fileName} was deleted.`);

      await container.item(doc.id, doc.id).delete();
      context.log(`Document ${doc.id} was deleter out of Cosmos DB.`);
    } catch (err) {
      context.log(`Errur ${doc.fileName}: ${err}`);
    }
  }
}

app.timer("timerDeleteExpiredBlobs", {
  schedule: "0 0 * * * *",
  handler: timerDeleteExpiredBlobs,
});
