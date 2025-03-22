# 🏍️ BikeDepot - Motorbike Shop Customer Management API

Welcome to **BikeDepot** — a REST API designed to manage customers for an online motorbike shop, built using **Node.js**. This project follows best coding practices and embraces the principles of **Hexagonal Architecture**.

It is optimized for deployment using **Serverless Framework** as an **AWS Lambda** function, with **DynamoDB** serving as the persistence layer.

👉 [**Test the public version of the API**](https://bk9bmtkdeg.execute-api.eu-north-1.amazonaws.com)

---

## 🧰 Tech Stack

This project uses the following technologies:

- **[TypeScript](https://www.typescriptlang.org/)** for strong typing and code quality.
- **[Node.js](https://nodejs.org)** as the runtime environment.
- **[Jest](https://jestjs.io/)** for testing.
- **[Hono](https://hono.dev/)** as the API framework.
- **[DynamoDB](https://aws.amazon.com/dynamodb/)** for data persistence.
- **[Serverless Framework](https://www.serverless.com/)** for cloud deployment.

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- **[Node.js](https://nodejs.org)**
- **[Yarn](https://yarnpkg.com/)** (Package manager)
- **[Docker](https://www.docker.com/)** (For local database)

> 💡 **Tip:** Make sure Docker Engine is running before proceeding.

---

### 🛠️ Installation Steps

1. **Clone the Repository:**  
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies:**  
   ```bash
   yarn install
   ```

3. **Start Docker Containers:**  
   ```bash
   yarn run docker-up
   ```

4. **Initialize the Database:**  
   ```bash
   yarn run migrate
   ```  
   ⏳ *Give it a few seconds for the database to initialize before running the previous command.*

---

### 🏁 Start the Local Server

Run the following command to launch the API locally:  
```bash
yarn run dev
```

- API will be available at **http://localhost:3000**
- DynamoDB runs on **http://localhost:8000** using Docker.

---

### 🧪 Run Tests

To run the linter and unit test suite, simply execute:  
```bash
yarn run test
```

---

## ☁️ Deployment

You can deploy the API using **Serverless Framework** to AWS Lambda.

There are two deployment modes available:

1. **Offline Mode** (For local simulation)
2. **AWS Lambda** (For live deployment)

---

### 🔎 Prerequisites for Deployment

Before deploying, ensure you have:

- A **[Serverless Framework Account](https://app.serverless.com/)**
- An **[AWS Account](https://console.aws.amazon.com/)**

When deploying for the first time, Serverless will prompt you to log in and connect to your AWS account.  
Follow the **[Official Serverless Tutorial](https://www.serverless.com/framework/docs/tutorial)** if needed.

---

### 🖥️ Deploy in Offline Mode

For local development, use offline mode. It uses the Docker-based DynamoDB.

Make sure you have completed the [**Installation Steps**](#installation-steps) before proceeding.

Then, run the following command to deploy in offline mode:

```bash
yarn run deploy-offline
```
- API will be accessible at **http://localhost:3000**

---

### 🌐 Deploy to AWS Lambda

To deploy to AWS and make the API publicly available, run:  
```bash
yarn run deploy-aws
```
That’s it! Your API is live. 🎉

---

## 📡 API Endpoints

- **`GET /`** → Health check
- **`GET /customers`** → List all customers (sorted by descending available credits)
- **`POST /customers`** → Create a new customer
- **`GET /customers/:id`** → Retrieve customer details
- **`PUT /customers/:id`** → Update a customer
- **`DELETE /customers/:id`** → Delete a customer
- **`PUT /customers-credit/:id`** → Update customer credits

---

## 📬 Testing API Endpoints

You can test the API endpoints using the `.http` files located at:  
```
/src/apps/shop/http
```

A configuration file called `http-client.env.json` is available with three preconfigured environments:

- **`dev`** → For the local Node.js server (`yarn run dev`)
- **`offline`** → For offline Serverless deploy (`yarn run deploy-offline`)
- **`aws`** → For AWS Serverless deploy (`yarn run deploy-aws`)

> 💡 **Tip:** Use an HTTP client like [VSCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or the built-in [JetBrains HTTP Client](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html) to run these `.http` files.
