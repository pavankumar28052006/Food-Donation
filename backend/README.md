# Food Donation Backend API

A Node.js/Express backend API for the Food Donation & Wastage Control System.

## Features

- User authentication (register/login) with JWT
- Food donation CRUD operations
- Input validation and error handling
- MongoDB database integration
- Security middleware (helmet, cors)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment variables:**
   Create a `.env` file in the root directory:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/food-donation
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Donations

- `GET /api/donations` - Get all donations (public)
- `POST /api/donations` - Create new donation (protected)
- `GET /api/donations/:id` - Get donation by ID (public)
- `PUT /api/donations/:id` - Update donation (protected, owner only)
- `DELETE /api/donations/:id` - Delete donation (protected, owner only)
- `GET /api/donations/my` - Get user's donations (protected)

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## Database Schema

### User
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)

### Donation
- foodType (String, required)
- quantity (Number, required, min: 1)
- pickupLocation (String, required)
- contact (String, required, phone format)
- description (String, optional)
- user (ObjectId, ref: User, required)
- status (String, enum: available/claimed/expired, default: available) 