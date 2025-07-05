# YouTube Clone Application

## Overview

This is a full-stack YouTube clone application built with React, TypeScript, and Express. The application features a modern UI with dark/light theme support, video browsing, search functionality, and a responsive design that mimics YouTube's interface.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom YouTube-themed color variables
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom theme provider with light/dark mode support

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with Express routes
- **Data Storage**: In-memory storage with interface for future database integration
- **Development**: Hot reload with Vite middleware integration

### Database Strategy
- **Current**: In-memory storage implementation
- **Future**: Drizzle ORM configured for PostgreSQL (Neon Database)
- **Schema**: Shared TypeScript schemas using Zod validation

## Key Components

### Core Features
1. **Video Browsing**: Grid-based video layout with thumbnails, titles, and metadata
2. **Video Player**: Custom video player with controls (play/pause, volume, fullscreen)
3. **Search System**: Real-time search with category filtering
4. **Responsive Design**: Mobile-first approach with collapsible sidebar
5. **Theme System**: Dark/light mode toggle with persistent preferences

### UI Components
- **Header**: Navigation bar with search, theme toggle, and user controls
- **Sidebar**: Collapsible navigation with subscriptions and library sections
- **VideoCard**: Reusable component for video thumbnails and metadata
- **VideoPlayer**: Custom video player with full controls
- **ThemeProvider**: Context-based theme management

### API Endpoints
- `GET /api/videos` - Retrieve all videos
- `GET /api/videos/:id` - Get specific video details
- `GET /api/search` - Search videos with optional category filter
- `GET /api/categories/:category` - Get videos by category
- `GET /api/channels` - Retrieve channel information
- `GET /api/channels/:id` - Get specific channel details

## Data Flow

1. **Client Requests**: React components use TanStack Query for API calls
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Data Validation**: Zod schemas ensure type safety across client and server
4. **Response Handling**: Queries are cached and managed by TanStack Query
5. **UI Updates**: React components re-render based on query state changes

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React for consistent iconography
- **Routing**: Wouter for client-side navigation
- **State**: TanStack Query for server state management

### Backend Dependencies
- **Server**: Express with TypeScript support
- **Database**: Neon Database (PostgreSQL) with Drizzle ORM
- **Validation**: Zod for runtime type checking
- **Development**: tsx for TypeScript execution

### Build Tools
- **Bundler**: Vite with React plugin
- **TypeScript**: Strict mode with path mapping
- **Linting**: ESLint configuration for code quality
- **Database**: Drizzle Kit for schema management

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with hot reload
- **Backend**: Express server with tsx for TypeScript execution
- **Database**: Local PostgreSQL or Neon Database connection
- **Environment**: NODE_ENV=development with debug logging

### Production
- **Build Process**: 
  1. Vite builds optimized React bundle
  2. esbuild bundles Express server
  3. Static assets served from dist/public
- **Server**: Node.js production server
- **Database**: Neon Database with connection pooling
- **Environment**: NODE_ENV=production with optimized settings

### Configuration
- **Database**: Configured via DATABASE_URL environment variable
- **Static Assets**: Served by Express in production
- **API Routes**: Mounted on Express server with CORS handling

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```