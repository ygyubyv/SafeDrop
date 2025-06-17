# SafeDrop Frontend

Це фронтенд частина проєкту **SafeDrop**, реалізована на Vue 3 з використанням TypeScript. Призначена для завантаження файлів, які будуть збережені в Azure Blob Storage з TTL, обмеженням доступу та одноразовим завантаженням.

## ⚙️ Налаштування

Перед запуском необхідно створити `.env` файл у корені папки `frontend/` зі змінними середовища:

```env
VITE_MSAL_CLIENT_ID
VITE_MSAL_TENANT_ID
VITE_MSAL_TENANT_NAME
VITE_MSAL_POLICY_NAME
VITE_MSAL_REDIRECT_URI
VITE_BACKEND_API_URL

