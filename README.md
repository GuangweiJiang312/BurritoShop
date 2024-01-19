# BurritoShop API

This repository contains the BurritoShop API, a backend service for managing burrito orders. It includes a Node.js Express server, MongoDB for data storage, and a Docker setup for easy deployment.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Node.js and npm](https://nodejs.org/en/download/)

## Setup and Running the Application

1. **Clone the Repository:**
   ```bash
   git clone [your-repo-url]
   cd BurritoShop
   ```
2. **Build the Docker Image:**
   ```
   docker build -t burrito-shop-api .
   ```
3. **Create a Docker Network:**
   ```
   docker network create burrito-network
   ```
4. **Run MongoDB Container:**
   ```
   docker run --name my-mongo --network burrito-network -d mongo
   ```
5. **Import the Database Dump:**
    Extract the database dump:
    ```
    tar -xzvf burrito_shop.tar.gz
    ```
    Use `mongorestore` to import the data into MongoDB:
    ```
    mongorestore --host my-mongo --db burrito_shop burrito_shop/
    ```
6. **Run the API Container:**
   ```
   docker run --network burrito-network -p 3000:3000 -d burrito-shop-api
   ```
7. **Verify the Application:**
- The API should now be accessible at http://localhost:3000.

## Testing the API
To run the Jest test suite, follow these steps:

1. **Install Node Modules:**
   ```
   npm install
   ```
2. **Run the Tests:**
   ```
   npm test
   ```

## API Endpoints
- GET /api/burrito: Lists all burrito products.
- GET /api/orders: Lists all orders. Requires API key authentication.
- POST /api/orders: Submits a new order. Requires API key authentication.
- GET /api/orders/:id: Fetches details of a specific order. Requires API key authentication.

## Using the API
To use the protected endpoints, include an API key in the request header:
   ```
   curl -X GET http://localhost:3000/api/orders -H "x-api-key: mysecretapikey"
   ```

## Troubleshooting
- MongoDB Connection Issues: 
Ensure the MongoDB container is running and accessible. Use the `docker ps` command to check the container status.
- API Not Accessible: 
Verify the API container is running and port 3000 is correctly mapped.

## Additional Notes
- The API key for testing the endpoints is `mysecretapikey`.
- Feel free to explore and modify the code to suit your testing purposes.