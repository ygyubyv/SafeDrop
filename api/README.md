# SafeDrop Backend

Це серверлес-бекенд частина проєкту **SafeDrop**, реалізована з використанням **Azure Functions (Node.js)** та **TypeScript**. Вона відповідає за:

- прийом завантажених файлів,
- збереження у **Azure Blob Storage**,
- створення метаданих у **Cosmos DB**,
- TTL (час життя),
- функцію одноразового скачування,
- автоматичне або ручне видалення файлів.

## ⚙️ Налаштування

Перед запуском локально потрібно створити файл `local.settings.json` у корені `backend/` з таким вмістом:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "Ваш ключ з Azure Portal (Storage account) для зберігання функцій",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AZURE_STORAGE_ACCOUNT_NAME": "Назва вашого Azure Storage акаунта",
    "AZURE_STORAGE_ACCOUNT_KEY": "Ключ доступу до Storage акаунта",
    "AZURE_STORAGE_CONNECTION_STRING": "Повний connection string до Azure Blob Storage",
    "COSMOS_DB_ENDPOINT": "URL вашої Cosmos DB інстанції",
    "COSMOS_DB_KEY": "Основний ключ доступу до Cosmos DB",
    "COSMOS_DB_CONNECTION_STRING": "onnection string для Cosmos DB (можна взяти з Azure Portal)"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
}

