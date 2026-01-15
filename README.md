Task Management System

A full-stack web application for securely managing personal tasks with authentication, filtering, and a modern dashboard UI.

Overview

This project is a full-stack Task Management System that allows users to securely register, log in, and manage their personal tasks. Users can create, update, delete, prioritize, and track tasks through a responsive and intuitive dashboard.

The application demonstrates proper frontend–backend integration, secure authentication, RESTful API design, and persistent data storage.

Tech Stack
Frontend

React.js (Vite)

JavaScript (ES6+)

Tailwind CSS

Axios

React Router DOM

Backend

Django

Django REST Framework

JWT Authentication (SimpleJWT)

Database

SQLite (development)

MySQL-ready configuration for production

Setup Instructions
Backend

Clone the repository

Create and activate a virtual environment

Install dependencies

Configure database and environment variables

Run migrations

Start the Django server

Frontend

Navigate to the frontend directory

Install dependencies

Configure the API base URL

Start the development server

Features Implemented
Authentication

User registration and login with JWT authentication

Protected routes for authenticated users

Task Management

Create, read, update, and delete tasks

Task categories

Priority levels (Low, Medium, High)

Task statuses (Pending, In Progress, Completed)

Due date support

Inline task status updates

Dashboard

Task filtering by status

Task search by title and description

Task statistics (computed on the frontend)

Responsive and clean UI

API & Documentation

RESTful API design

Swagger API documentation

Future Enhancements

Backend task statistics endpoint

User profile endpoint

Pagination for large task lists

Email reminders for due dates

Challenges and Solutions
Challenge: Database migration issues during deployment on Render

Problem
During backend deployment on Render (free tier), the application returned a 500 Internal Server Error when accessing the user registration endpoint. Debugging was initially difficult because database tables were not created automatically, and Render’s free tier does not provide an interactive shell to manually run migrations.

To diagnose the issue:

Deployment logs were reviewed

Debug logging was temporarily enabled

Errors indicated missing database tables (for example, auth_user)

This confirmed that migrations were not being applied during deployment.

Final Solution (No Shell Needed)

To permanently resolve the issue, Render was configured to run database migrations automatically on every deployment.

Step 1: Update Render Start Command

In Render Dashboard → Backend Service → Settings, the start command was changed from:

gunicorn backend.wsgi:application


to:

python manage.py migrate && gunicorn backend.wsgi:application


This ensures:

Database migrations run before the server starts

Required tables (such as auth_user) are created automatically

Registration and authentication endpoints function correctly

Step 2: Redeploy

Saving the updated configuration triggered an automatic redeployment. Deployment logs confirmed successful execution of migration files before the application server started.

Final Note

This project fulfills all core requirements of the Fullstack Software Development Internship Assignment and demonstrates practical experience in secure authentication, RESTful API design, frontend–backend integration, deployment debugging, and responsive UI development.