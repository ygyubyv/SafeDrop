import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { db } from "../cosmos_db/cosmosClient";

export async function getFileMetadata(req: HttpRequest): Promise<HttpResponseInit> {
  const id = req.query.get("id");
  if (!id) {
    return {
      status: 400,
      body: "Missing 'id' query parameter",
    };
  }

  try {
    const { resource } = await db.item(id, id).read();

    if (!resource) {
      return {
        status: 404,
        body: "File not found",
      };
    }

    const { fileName, size, uploadedAt, url } = resource;

    return {
      status: 200,
      jsonBody: {
        id,
        fileName,
        size,
        uploadedAt,
        url,
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
