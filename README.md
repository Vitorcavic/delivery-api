# Delivery API

A Node.js + TypeScript API for managing delivery orders, user authentication, and shipment status updates.

This project was built as a backend challenge focused on practical business logic, JWT-based authentication, authorization rules, and persistence with PostgreSQL using Prisma.

## Overview

The platform allows:

- user registration with hashed passwords
- login and JWT generation
- role-based access control
- creation and listing of delivery orders
- shipment status updates
- delivery logs to track order progress

## Tech Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt
- Zod validation
- Jest + Supertest

## Core Features

- Secure user signup and authentication
- `customer` and `sale` role separation
- Protected routes with JWT verification
- Delivery lifecycle management (`processing`, `shipped`, `delivered`)
- Delivery history logs for operational tracking
- Validation and structured error handling

## Project Structure

```bash
.
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── env.ts
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── tests/
│   ├── types/
│   └── utils/
├── docker-compose.yml
├── jest.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Data Model

The application uses the following main entities:

- `User`: stores user data and role
- `Delivery`: stores delivery description and current status
- `DeliveryLog`: records status changes and activity history

## Getting Started

### Prerequisites

- Node.js 18+
- Docker + Docker Compose
- PostgreSQL (or use the provided Docker setup)

### 1) Install dependencies

```bash
npm install
```

### 2) Start the PostgreSQL database

```bash
docker compose up -d
```

### 3) Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/delivery-api?schema=public"
JWT_SECRET=your_super_secret_key
PORT=3333 (You can change the port here, 3333 is already the default port)
```

### 4) Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5) Start the API

```bash
npm run dev
```

The server will run on:

```bash
http://localhost:3333
```

## Authentication

Some routes require a valid JWT. Include it in the request headers:

```http
Authorization: Bearer <token>
```

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/users` | Register a new user |
| POST | `/sessions` | Authenticate user and receive a JWT |
| POST | `/deliveries` | Create a delivery order (sale role required) |
| GET | `/deliveries` | List all delivery orders (sale role required) |
| PATCH | `/deliveries/:id/status` | Update order status (sale role required) |
| POST | `/delivery-logs` | Create a log for a delivery (sale role required) |
| GET | `/delivery-logs/:delivery_id/show` | Fetch delivery details and logs |

## Example Requests

### Register a user

```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@email.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@email.com",
    "password": "password123"
  }'
```

### Create a delivery

```bash
curl -X POST http://localhost:3333/deliveries \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "user_id": "<customer-user-id>",
    "description": "Order for a custom package"
  }'
```

## Testing

```bash
npm test
```

This project includes automated tests for authentication flows and core request validation.

## Notes

This API was designed to simulate a real delivery management system with a clean separation between:

- customers
- sales operators
- shipment progress tracking

It demonstrates production-oriented backend concepts such as:

- secure authentication
- authorization checks
- validation with Zod
- relational persistence with Prisma
- scalable API structure using Express routers and controllers

## License

This project is licensed under the ISC License.

## Author

Vítor Roggeri Cavicchiolli
