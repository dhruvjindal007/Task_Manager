Task Management System
Overview

This project is a full-stack Task Management System that allows users to securely register, log in, and manage their personal tasks. Users can create, update, delete, prioritize, and track tasks through a responsive and intuitive dashboard. The application demonstrates proper frontend–backend integration, secure authentication, and persistent data storage.

Tech Stack

Frontend: React.js (Vite), JavaScript (ES6+), Tailwind CSS, Axios, React Router DOM

Backend: Django, Django REST Framework, JWT Authentication (SimpleJWT)

Database: SQLite (development), MySQL-ready configuration

Setup Instructions
Backend

Clone repository

Create and activate virtual environment

Install dependencies

Setup database and environment variables

Run migrations

Start Django server

Frontend

Navigate to frontend directory

Install dependencies

Configure API base URL

Start development server

Features Implemented

User registration and login with JWT authentication

Protected routes for authenticated users

Create, read, update, and delete tasks

Task categories, priorities (Low, Medium, High), and statuses

Due date support

Inline task status updates

Task filtering by status

Task search by title and description

Dashboard with task statistics (computed on frontend)

Responsive and clean UI

Swagger API documentation

Future enhancement:

Backend task statistics endpoint

User profile endpoint

Pagination and email reminders

Challenges and Solutions

Challenge 1: Securing user data and protecting routes
Solution: Implemented JWT-based authentication using Django SimpleJWT and enforced protected routes on both frontend and backend to ensure users can access only their own tasks.

Challenge 2: Keeping the UI in sync with backend data after task updates
Solution: Used controlled state management and API-driven updates to immediately reflect create, update, delete, and status changes in the dashboard without page reloads.