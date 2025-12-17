# OTT_Frontend
BCA 2023-27 Internship Project - OTT PLATFORM

Frontend application for an OTT streaming platform built with React and Vite.

## Tech Stack

- React 18
- Vite
- React Router
- Axios
- Context API (State Management)
- CSS3

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Create a `.env` file:

   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

3. **Run the application**

   ```bash
   # Development mode
   npm run dev

   # Build for production
   npm run build

   # Preview production build
   npm run preview
   ```

## Features

- User authentication (Sign up, Sign in, Logout)
- Video browsing and streaming
- User profiles and settings
- Video upload and management
- Search functionality
- AI Assistant / ChatBot
- History tracking
- Collections and playlists
- Responsive design

## Project Structure

```
src/
├── components/      # React components
├── context/         # Context API providers
├── services/        # API service calls
├── config/          # Configuration files
├── assets/          # Static assets
└── utils/           # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The app connects to the OTT Backend API. Configure the base URL in the axios config file or environment variables.
