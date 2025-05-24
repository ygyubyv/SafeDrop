import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import {
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";
import { saveFileMetadata } from "../cosmos_db/saveFileMetadata";

const generateSasUrl = (
  accountName: string,
  accountKey: string,
  containerName: string,
  blobName: string,
  permissions: string
): string => {
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse(permissions),
      startsOn: new Date(Date.now() - 1 * 60 * 1000),
      expiresOn: new Date(Date.now() + 15 * 60 * 1000),
      protocol: SASProtocol.Https,
    },
    sharedKeyCredential
  ).toString();

  return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
};

export async function generateSasToken(req: HttpRequest): Promise<HttpResponseInit> {
  const fileName = req.query.get("filename");
  const size = +(req.query.get("size") || 0);
  const ttl = +(req.query.get("ttl") || 0);
  const type = req.query.get("type") || "upload";

  if (!fileName) {
    return { status: 400, body: "Missing filename query parameter" };
  }

  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
  const containerName = "safe-drop";

  let permissions = "";
  if (type === "upload") {
    if (!size) {
      return { status: 400, body: "Missing size query parameter for upload" };
    }
    permissions = "cw";
  } else if (type === "download") {
    permissions = "r";
  } else {
    return { status: 400, body: "Invalid type query parameter (upload or download expected)" };
  }

  const url = generateSasUrl(accountName, accountKey, containerName, fileName, permissions);

  if (type === "upload") {
    const id = uuidv4();
    await saveFileMetadata({
      id,
      fileName,
      size,
      uploadedAt: Date.now(),
      expiresAt: Date.now() + ttl * 1000,
      ttl,
    });

    return {
      status: 200,
      jsonBody: { url, id },
    };
  }

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
