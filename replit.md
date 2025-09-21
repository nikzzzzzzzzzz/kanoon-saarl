# Overview

Kanoon Saral is a full-stack web application that simplifies Indian legal documents using AI. The application takes complex legal text or document images and converts them into plain Indian English/Hinglish language that is culturally appropriate and easy to understand. Built as a Government of India initiative, it aims to make legal documents accessible to citizens with basic education who may not be familiar with legal terminology.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using **React 18** with **TypeScript** and follows a modern component-based architecture:

- **UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives for accessible, customizable components
- **Styling**: TailwindCSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **File Upload**: React Dropzone for drag-and-drop file uploads with validation

The frontend uses a tab-based interface allowing users to either paste text directly or upload document images (JPG, PNG, PDF). The application provides real-time feedback with loading states, error handling, and toast notifications.

## Backend Architecture
The backend follows a **Node.js Express** architecture with TypeScript:

- **Framework**: Express.js with middleware for CORS, JSON parsing, and request logging
- **File Processing**: Multer for multipart file uploads with size and type validation
- **API Design**: RESTful endpoints with proper HTTP status codes and JSON responses
- **Error Handling**: Centralized error handling middleware with appropriate error responses
- **Development Setup**: Vite integration for hot module replacement in development

The backend is stateless and processes documents on-demand without persistent storage, focusing on immediate processing and response.

## Data Storage Solutions
The application uses a **stateless architecture** with no persistent database:

- **In-Memory Processing**: All document processing happens in memory
- **Session Management**: Uses connect-pg-simple for session storage (configured but not actively used)
- **File Handling**: Temporary file processing with immediate cleanup

The schema configuration suggests potential future PostgreSQL integration using Drizzle ORM, but current implementation is entirely stateless.

## Authentication and Authorization
Currently implements **no authentication system** - the application is designed as a public service:

- **Open Access**: All endpoints are publicly accessible
- **CORS Configuration**: Allows cross-origin requests from any domain
- **No User Management**: No user accounts, sessions, or access control

## AI Integration Architecture
**Google Gemini AI** integration for document processing:

- **Model**: Uses Gemini 2.5 Flash for text generation and analysis
- **Prompt Engineering**: Sophisticated system prompts designed for Indian legal context
- **Multi-Modal Support**: Handles both text input and image processing (OCR + simplification)
- **Cultural Adaptation**: Prompts specifically designed for Indian English/Hinglish output with cultural relevance
- **Error Handling**: Graceful degradation when AI service is unavailable

The AI integration includes specific instructions for formatting output with sections like "यह क्या है? (What is this?)" and bilingual explanations.

# External Dependencies

## Third-Party Services
- **Google Gemini API**: Primary AI service for document simplification and text extraction from images
- **Neon Database**: PostgreSQL hosting service (configured for future use)

## Key Libraries and Frameworks
- **UI Components**: Radix UI primitives, shadcn/ui component library
- **Styling**: TailwindCSS, class-variance-authority for component variants
- **State Management**: TanStack React Query for server state caching
- **Forms**: React Hook Form, Zod for schema validation
- **File Handling**: Multer (backend), react-dropzone (frontend)
- **HTTP Client**: Fetch API with custom wrapper functions
- **Database ORM**: Drizzle ORM with PostgreSQL adapter (configured but not used)
- **Development Tools**: Vite build tool, TypeScript compiler, ESBuild for production builds

## Build and Deployment
- **Frontend Build**: Vite with React plugin and TypeScript support
- **Backend Build**: ESBuild for Node.js bundling with ESM modules
- **Development**: Hot module replacement via Vite middleware integration
- **Production**: Compiled JavaScript with external package handling

The application is optimized for deployment on platforms like Replit with development-specific plugins for error handling and debugging.