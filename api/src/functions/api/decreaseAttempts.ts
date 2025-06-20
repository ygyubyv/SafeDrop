import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";
import { verifyJwtToken } from "../../helpers/jwtVerifier";

const cosmosConnection = process.env.COSMOS_DB_CONNECTION_STRING!;
const databaseName = "safe-drop";
const containerName = "metadata";

export async function decreaseAttempts(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const id = request.query.get("id");

  if (!id) {
    return { status: 400, body: "Missing id" };
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return { status: 401, body: "Missing Authorization token" };
  }

  try {
    await verifyJwtToken(token, "safedrop.download");
  } catch (error) {
    return { status: 403, body: "Invalid or expired token" };
  }

  const cosmosClient = new CosmosClient(cosmosConnection);
  const container = cosmosClient.database(databaseName).container(containerName);

  try {
    const { resource: doc } = await container.item(id, id).read();

    if (!doc) return { status: 404, body: "Not found" };
    if (doc.downloadAttempts <= 0) return { status: 400, body: "No attempts left" };

    doc.downloadAttempts -= 1;
    await container.item(id, id).replace(doc);

    return { status: 200, body: "Attempts decreased" };
  } catch (err) {
    context.error(err);
    return { status: 500, body: "Internal server error" };
  }
}

app.http("decreaseAttempts", {
  methods: ["PATCH"],
  authLevel: "anonymous",
  handler: decreaseAttempts,
});
