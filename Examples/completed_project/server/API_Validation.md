# API Validation Commands

This document contains curl commands for testing the backend API endpoints.

## Authentication

### Register
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Chats

### Create New Chat
```bash
curl -X POST http://localhost:3000/api/v1/chats \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Chat"}'
```

### Get All Chats
```bash
curl -X GET http://localhost:3000/api/v1/chats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Specific Chat
```bash
curl -X GET http://localhost:3000/api/v1/chats/CHAT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Add Message to Chat
```bash
curl -X POST http://localhost:3000/api/v1/chats/CHAT_ID/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello, AI!", "role":"user"}'
```

### Delete Chat
```bash
curl -X DELETE http://localhost:3000/api/v1/chats/CHAT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Health Check
```bash
curl -X GET http://localhost:3000/api/v1/health
```

## Notes
- Replace `YOUR_TOKEN` with the JWT token received from login
- Replace `CHAT_ID` with the actual chat ID
- All chat endpoints require authentication
- The server must be running on port 3000 (or adjust the port in the URLs accordingly)
