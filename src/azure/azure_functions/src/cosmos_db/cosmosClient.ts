import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_DB_ENDPOINT!;
const key = process.env.COSMOS_DB_KEY!;
const databaseId = "safe-drop";
const containerId = "metadata";

const client = new CosmosClient({ endpoint, key });

export const db = client.database(databaseId).container(containerId);
