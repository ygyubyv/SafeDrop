# SafeDrop

> A secure file-sharing system with self-destruction, TTL (Time-to-Live), and access restriction support.

---

## 🔍 Overview

**SafeDrop** is a web application that enables users to securely share files over the internet. Users can upload files, generate download links with limited access, and rely on automatic file deletion after a defined time or usage limit.

### Key Features:
- Upload single or multiple files with automatic archiving;
- Generate unique download links;
- Limit the number of allowed downloads;
- Set Time-to-Live;
- Automatically delete files after TTL expires or access attempts are exhausted;
- Secure file sharing via Azure AD B2C.

---

## 🧰 Technologies Used

### Frontend
- **Vue 3 (Composition API)**
- **TypeScript**
- **Tailwind CSS**
- **PrimeVue**
- **Azure AD B2C + MSAL.js**

### Backend
- **Azure Functions (Serverless)**
- **Timer Trigger**
- **Cosmos DB Trigger**
- **Azure Blob Storage**
- **Azure Cosmos DB**

---

## ☁️ Infrastructure

- **Azure Static Web Apps**:
  - Automatic CI/CD with GitHub integration
  - Unified environment for frontend and serverless backend
- **GitHub Actions**:
  - Builds, deploys, and manages application lifecycle

  - Збірка, розгортання, управління середовищем
- **Конфігурація через `staticwebapp.config.json`**
- Підтримка staging та production середовищ

---

