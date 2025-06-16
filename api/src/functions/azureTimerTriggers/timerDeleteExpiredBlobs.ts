import { app, InvocationContext, Timer } from "@azure/functions";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { db } from "../../cosmos_db/cosmosClient";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
const containerStorage = "safe-drop";

export async function timerDeleteExpiredBlobs(
  timer: Timer,
  context: InvocationContext
): Promise<void> {
  const now = Date.now();

  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );
  const blobContainerClient =
    blobServiceClient.getContainerClient(containerStorage);

  const query = {
    query:
      "SELECT * FROM c WHERE c.expiresAt <= @now OR c.downloadAttempts = 0",
    parameters: [{ name: "@now", value: now }],
  };

  const { resources } = await db.items.query(query).fetchAll();

  context.log(`Found documents to delete: ${resources.length}`);

  for (const doc of resources) {
    try {
      const blobClient = blobContainerClient.getBlobClient(doc.fileName);
      await blobClient.deleteIfExists();
      context.log(`File ${doc.fileName} was deleted.`);

      await db.item(doc.id, doc.id).delete();
      context.log(`Document ${doc.id} was deleted out of Cosmos DB.`);
    } catch (err) {
      context.log(`Error ${doc.fileName}: ${err}`);
    }
  }
}

app.timer("timerDeleteExpiredBlobs", {
  schedule: "0 0 * * * *",
  handler: timerDeleteExpiredBlobs,
});
