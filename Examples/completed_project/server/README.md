# AI Chat Assistant - Server

A Node.js/Express backend for the AI Chat Assistant application, featuring MongoDB integration and Azure OpenAI Service.

## Features

- 🚀 Express.js server with TypeScript
- 🗄️ MongoDB database integration
- 🔐 JWT authentication
- 🤖 Azure OpenAI Service integration
- 📁 File upload with Azure Blob Storage
- 📡 WebSocket support for real-time chat
- 📝 API documentation with Swagger

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (v4.4 or higher)
- Azure subscription (for OpenAI and Blob Storage)

### Installation

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Update the `.env` file with your configuration

### Development

Start the development server:
```bash
npm run dev
```

The server will be available at `http://localhost:3000`

### Building for Production

Create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Chat
- `GET /api/chats` - Get all chats
- `POST /api/chats` - Create a new chat
- `GET /api/chats/:id` - Get chat by ID
- `DELETE /api/chats/:id` - Delete chat
- `POST /api/chats/:id/messages` - Send message in chat

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files/:id` - Get file by ID
- `DELETE /api/files/:id` - Delete file

## Dependencies

- Express.js
- MongoDB
- Mongoose
- JWT
- Azure OpenAI Service
- Azure Blob Storage
- Socket.io
- Swagger UI

## Development Guidelines

### Code Structure

- Follow MVC pattern
- Use TypeScript for type safety
- Implement proper error handling
- Use async/await for asynchronous operations

### Security

- Implement proper authentication
- Use environment variables for sensitive data
- Validate all user input
- Implement rate limiting
- Use HTTPS in production

### Testing

- Write unit tests for services
- Write integration tests for API endpoints
- Use Jest for testing
- Maintain good test coverage

### Documentation

- Document all API endpoints
- Use JSDoc for code documentation
- Keep README up to date
- Document environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or suggestions, please open an issue in the repository. 