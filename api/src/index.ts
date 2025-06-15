import { app } from "@azure/functions";

import "./functions/api/decreaseAttempts";
import "./functions/api/getDownloadSasToken";
import "./functions/api/getFileMetadata";
import "./functions/api/getUploadSasToken";

import "./functions/azureTimerTriggers/timerDeleteExpiredBlobs";

import "./functions/cosmosDBTriggers/cosmosDbDeleteBlobOnAttemptsZero";

app.setup({
  enableHttpStream: true,
});
