import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { verifyJwtToken } from "../../helpers/jwtVerifier";
import { db } from "../../cosmos_db/cosmosClient";

export async function getFileMetadata(req: HttpRequest): Promise<HttpResponseInit> {
  const id = req.query.get("id");

  if (!id) {
    return {
      status: 400,
      body: "Missing 'id' query parameter",
    };
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return { status: 401, body: "Missing Authorization token" };
  }

  try {
    await verifyJwtToken(token, "safedrop.download");
  } catch (error) {
    return { status: 403, body: "Invalid or expired token" };
  }

  try {
    const { resource } = await db.item(id, id).read();

    if (!resource) {
      return {
        status: 404,
        body: "File not found",
      };
    }

    const { fileName, size, uploadedAt, expiresAt } = resource;

    return {
      status: 200,
      jsonBody: {
        id,
        fileName,
        size,
        uploadedAt,
        expiresAt,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: `Error retrieving file metadata: ${(error as Error).message}`,
    };
  }
}

app.http("getFileMetadata", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getFileMetadata,
});
