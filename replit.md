# Portfolio Website

## Overview

This is a personal portfolio website for Alexey Rozepin, a fullstack web developer. The application is built as a modern single-page application with a React frontend and Express backend, featuring a contact form that integrates with Telegram for lead management. The website showcases services, case studies, and provides a professional contact interface for potential clients.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessibility
- **State Management**: TanStack Query for server state management and data fetching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the full stack
- **Storage**: In-memory storage implementation with interface for future database integration
- **API Structure**: RESTful API design with /api prefix for all endpoints
- **Development**: Hot reload with Vite middleware integration

### Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Schema Location**: Shared schema definitions in `/shared/schema.ts` for type consistency
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Current State**: In-memory storage with database-ready interface for easy migration

### Deployment Architecture
- **Serverless Functions**: Netlify Functions for contact form processing and file downloads
- **Static Hosting**: Optimized for JAMstack deployment with static site generation
- **Environment Configuration**: Environment-based configuration for development and production

### Key Features
- **Responsive Design**: Mobile-first approach with adaptive navigation and layouts
- **Contact System**: Telegram bot integration for real-time lead notifications
- **Portfolio Management**: Dynamic case study presentation with download functionality
- **Performance Optimization**: Lazy loading, code splitting, and optimized asset delivery
- **SEO Ready**: Meta tags, structured data, and semantic HTML for search optimization

## External Dependencies

### Core Infrastructure
- **Neon Database**: PostgreSQL serverless database for production data storage
- **Netlify**: Hosting platform with serverless functions for backend processing
- **Telegram Bot API**: Real-time notification system for contact form submissions

### Development Tools
- **Replit**: Development environment with integrated debugging and deployment
- **Vite**: Build tool with hot module replacement and optimized bundling
- **TypeScript**: Type system for compile-time error detection and IDE support

### UI and Styling
- **Radix UI**: Accessible component primitives for form controls and overlays
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Font Awesome**: Icon library for visual elements and branding
- **Google Fonts**: Inter font family for typography consistency

### Form and Data Management
- **Zod**: Schema validation library for runtime type checking
- **React Hook Form**: Form state management with performance optimization
- **TanStack Query**: Server state management with caching and synchronization

### Communication Services
- **Telegram Bot API**: Automated message delivery for contact form submissions
- **Email Integration**: Fallback contact method through standard email protocols