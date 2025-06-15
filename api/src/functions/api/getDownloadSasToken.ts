import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { generateSasUrl } from "../../helpers/generateSasUrl";
import { verifyJwtToken } from "../../helpers/jwtVerifier";

export async function getDownloadSasToken(req: HttpRequest): Promise<HttpResponseInit> {
  const fileName = req.query.get("filename");

  if (!fileName) {
    return { status: 400, body: "Missing filename query parameter" };
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

  try {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
    const containerName = "safe-drop";

    const permissions = "r";
    const url = generateSasUrl(accountName, accountKey, containerName, fileName, permissions);

    return {
      status: 200,
      jsonBody: { url },
    };
  } catch (err) {
    console.error("JWT verification failed:", err);
    return { status: 403, body: "Invalid or expired token" };
  }
}

app.http("getDownloadSasToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getDownloadSasToken,
});
