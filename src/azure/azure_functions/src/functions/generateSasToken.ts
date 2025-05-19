import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import {
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

export async function generateSasToken(req: HttpRequest): Promise<HttpResponseInit> {
  const fileName = req.query.get("filename");
  if (!fileName) {
    return {
      status: 400,
      body: "Missing filename query parameter",
    };
  }

  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
  const containerName = "safe-drop";

  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName: fileName,
      permissions: BlobSASPermissions.parse("cw"),
      startsOn: new Date(Date.now() - 1 * 60 * 1000),
      expiresOn: new Date(Date.now() + 15 * 60 * 1000),
      protocol: SASProtocol.Https,
    },
    sharedKeyCredential
  ).toString();

  const url = `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}?${sasToken}`;

  return {
    status: 200,
    jsonBody: { url },
  };
}

app.http("generateSasToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: generateSasToken,
});
