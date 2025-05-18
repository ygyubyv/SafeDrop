import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

export async function uploadFile(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    return { status: 500, body: "Storage connection string not set." };
  }

  try {
    const bodyBuffer = await req.arrayBuffer();
    const { fileName, fileContentBase64 } = JSON.parse(Buffer.from(bodyBuffer).toString());

    if (!fileName || !fileContentBase64) {
      return { status: 400, body: "fileName і fileContentBase64 обовʼязкові." };
    }

    const buffer = Buffer.from(fileContentBase64, "base64");

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient("data");

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(buffer);

    return {
      status: 200,
      jsonBody: { message: "Файл успішно завантажено!", url: blockBlobClient.url },
    };
  } catch (err: any) {
    context.error("Помилка:", err.message);
    return { status: 500, body: "Сталася помилка при обробці запиту." };
  }
}

app.http("uploadFile", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: uploadFile,
});
