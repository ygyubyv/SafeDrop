import { app, HttpRequest, HttpResponseInit } from "@azure/functions";

import { generateSasUrl } from "../helpers/generateSasUrl";

export async function getDownloadSasToken(req: HttpRequest): Promise<HttpResponseInit> {
  const fileName = req.query.get("filename");
  if (!fileName) {
    return { status: 400, body: "Missing filename query parameter" };
  }

  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
  const containerName = "safe-drop";

  const permissions = "r";
  const url = generateSasUrl(accountName, accountKey, containerName, fileName, permissions);

  return {
    status: 200,
    jsonBody: { url },
  };
}

app.http("getDownloadSasToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getDownloadSasToken,
});
