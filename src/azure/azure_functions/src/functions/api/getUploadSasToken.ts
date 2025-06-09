import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { v4 as uuidv4 } from "uuid";
import { generateSasUrl } from "../../helpers/generateSasUrl";
import { verifyJwtToken } from "../../helpers/jwtVerifier";
import { saveFileMetadata } from "../../cosmos_db/saveFileMetadata";

export async function getUploadSasToken(req: HttpRequest): Promise<HttpResponseInit> {
  const fileName = req.query.get("filename");
  const size = +(req.query.get("size") || 0);
  const ttl = +(req.query.get("ttl") || 0);

  if (!fileName || !size || !ttl) {
    return { status: 400, body: "Missing one of: filename, size, ttl" };
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return { status: 401, body: "Missing Authorization token" };
  }

  try {
    await verifyJwtToken(token, "safedrop.upload");
  } catch (error) {
    return { status: 403, body: "Invalid or expired token" };
  }

  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
  const containerName = "safe-drop";

  const permissions = "cw";

  const url = generateSasUrl(accountName, accountKey, containerName, fileName, permissions);

  const id = uuidv4();
  await saveFileMetadata({
    id,
    fileName,
    size,
    downloadAttempts: 1,
    uploadedAt: Date.now(),
    expiresAt: Date.now() + ttl * 1000,
  });

  return {
    status: 200,
    jsonBody: { url, id },
  };
}

app.http("getUploadSasToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getUploadSasToken,
});
