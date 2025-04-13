# Football Slot Booking API Requirements

## Overview
This document outlines the requirements for the Football Slot Booking API that will support the client application. The API will handle user authentication, slot management, and booking operations.

## Technology Stack
- **Backend Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing

## API Endpoints

### Authentication

#### 1. User Registration
- **Endpoint**: `POST /api/auth/register`
- **Purpose**: Register a new user
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - Status Code: 201 (Created)
  - Response Body:
    ```json
    {
      "token": "jwt_token_string",
      "user": {
        "id": "user_id",
        "name": "User Name",
        "email": "user@example.com"
      }
    }
    ```
- **Error Handling**:
  - 400: User already exists
  - 500: Server error

#### 2. User Login
- **Endpoint**: `POST /api/auth/login`
- **Purpose**: Authenticate a user
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - Status Code: 200 (OK)
  - Response Body:
    ```json
    {
      "token": "jwt_token_string",
      "user": {
        "id": "user_id",
        "name": "User Name",
        "email": "user@example.com"
      }
    }
    ```
- **Error Handling**:
  - 400: Invalid credentials
  - 500: Server error

### Slot Management

#### 1. Get All Slots
- **Endpoint**: `GET /api/slots`
- **Purpose**: Retrieve all available slots, optionally filtered by date
- **Query Parameters**:
  - `date`: (optional) Filter slots by specific date (YYYY-MM-DD)
- **Response**:
  - Status Code: 200 (OK)
  - Response Body:
    ```json
    [
      {
        "id": "slot_id",
        "date": "2025-03-26T09:00:00.000Z",
        "maxPlayers": 12,
        "bookedPlayers": [
          {
            "id": "user_id",
            "name": "User Name"
          }
        ]
      }
    ]
    ```
- **Error Handling**:
  - 500: Server error

#### 2. Get Available Slots Within Date Range
- **Endpoint**: `GET /api/slots/available`
- **Purpose**: Retrieve available slots within a date range
- **Query Parameters**:
  - `startDate`: (optional) Start date (YYYY-MM-DD)
  - `endDate`: (optional) End date (YYYY-MM-DD)
- **Response**: Same as Get All Slots
- **Error Handling**:
  - 500: Server error

#### 3. Get Slot by ID
- **Endpoint**: `GET /api/slots/:id`
- **Purpose**: Get detailed information about a specific slot
- **Response**:
  - Status Code: 200 (OK)
  - Response Body: Single slot object with booked players
- **Error Handling**:
  - 404: Slot not found
  - 500: Server error

#### 4. Create Slot
- **Endpoint**: `POST /api/slots`
- **Purpose**: Create a new slot (admin only)
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "date": "2025-03-26T09:00:00.000Z",
    "maxPlayers": 12
  }
  ```
- **Response**:
  - Status Code: 201 (Created)
  - Response Body: Created slot object
- **Error Handling**:
  - 401: Unauthorized
  - 500: Server error

#### 5. Generate Multiple Slots
- **Endpoint**: `POST /api/slots/generate`
- **Purpose**: Generate slots for multiple days (admin only)
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "days": 14,
    "times": ["09:00", "19:00"]
  }
  ```
- **Response**:
  - Status Code: 201 (Created)
  - Response Body: Information about created slots
- **Error Handling**:
  - 401: Unauthorized
  - 500: Server error

### Booking Management

#### 1. Get User's Bookings
- **Endpoint**: `GET /api/bookings`
- **Purpose**: Retrieve all bookings for the authenticated user
- **Authentication**: Required
- **Response**:
  - Status Code: 200 (OK)
  - Response Body:
    ```json
    [
      {
        "id": "booking_id",
        "userId": "user_id",
        "slotId": {
          "id": "slot_id",
          "date": "2025-03-26T09:00:00.000Z",
          "bookedPlayers": [
            {
              "id": "user_id",
              "name": "User Name"
            }
          ]
        },
        "createdAt": "2025-03-25T12:00:00.000Z"
      }
    ]
    ```
- **Error Handling**:
  - 401: Unauthorized
  - 500: Server error

#### 2. Book a Slot
- **Endpoint**: `POST /api/bookings`
- **Purpose**: Create a booking for the authenticated user
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "slotId": "slot_id"
  }
  ```
- **Response**:
  - Status Code: 201 (Created)
  - Response Body: Created booking object with populated slot information
- **Error Handling**:
  - 400: User already booked this slot / Slot is full / User already has an active booking
  - 401: Unauthorized
  - 404: Slot not found
  - 500: Server error

#### 3. Cancel Booking
- **Endpoint**: `DELETE /api/bookings/:id`
- **Purpose**: Cancel a booking
- **Authentication**: Required
- **Response**:
  - Status Code: 200 (OK)
  - Response Body:
    ```json
    {
      "message": "Booking cancelled successfully"
    }
    ```
- **Error Handling**:
  - 401: Unauthorized
  - 403: Not authorized to cancel this booking
  - 404: Booking not found
  - 500: Server error

## Data Models

### User Model
- **Fields**:
  - `name`: String (required)
  - `email`: String (required, unique)
  - `password`: String (required, hashed)
  - `createdAt`: Date (default: now)

### Slot Model
- **Fields**:
  - `date`: Date (required)
  - `maxPlayers`: Number (default: 12)
  - `bookedPlayers`: Array of User references

### Booking Model
- **Fields**:
  - `userId`: User reference (required)
  - `slotId`: Slot reference (required)
  - `createdAt`: Date (default: now)
- **Constraints**:
  - One booking per user (unique index on userId)

## Business Rules

1. **Booking Limit**: Users can have only one active booking at a time
2. **Cancellation**: Users can only cancel their own bookings
3. **Slot Capacity**: Slots have a maximum number of players (default: 12)
4. **Date Range**: By default, slots are shown for the next 14 days
5. **Slot Times**: Default slot times are 9:00 AM and 7:00 PM each day

## Security Requirements

1. **Authentication**: JWT-based authentication for protected routes
2. **Password Security**: Passwords must be hashed using bcrypt
3. **Authorization**: Users can only access and modify their own bookings
4. **Input Validation**: All inputs must be validated before processing

## Integration with Frontend

The API must provide all necessary endpoints to support the React frontend application, which includes:
- User authentication (login/register)
- Viewing available slots
- Filtering slots by date
- Booking and cancelling slots
- Viewing user's bookings

## Future Considerations

1. **Admin Panel**: Functionality for administrators to manage slots and bookings
2. **Notifications**: Email or push notifications for booking confirmations and reminders
3. **Recurring Bookings**: Allow users to book recurring slots
4. **Waitlist**: Implementation of a waitlist for full slots