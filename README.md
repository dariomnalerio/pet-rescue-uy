# TS-Rest Demo Monorepo

This repository is a monorepo managed by lerna containing three packages: `api`, `contract`, and `react-client`. It demonstrates the usage of TypeScript with a focus on using `ts-rest` for API contract validation.

## Packages

### API

The `api` package is an Express server that uses the `ts-rest` contract from the `contract` package. It utilizes the contract for routing and response validation.

### Contract

The `contract` package defines the API contract using `ts-rest` and `zod`. This package is consumed by both the `api` and `react-client` packages to ensure type-safe API communication.

### React Client

The `react-client` package is a React application built with Vite. It consumes the API contract and provides a frontend interface to interact with the API.

## Setup

### Prerequisites

- Up to date Node.js and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ts-rest-demo.git
   cd ts-rest-demo
   ```

2. Install dependencies:
   ```bash
    npm install
    ```

3. Build the packages: 
   ```bash
   npm run build
   ```
   To build only a specific package:
   ```bash
   npx lerna run build --scope <package-name>
    ```

4. Start the API server:
   ```bash
    npm run start-api
    ```

5. Start the React client:
    ```bash
      npm run dev-react
      ```
      
