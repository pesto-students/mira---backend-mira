# MIRA - Backend

MIRA is a lightweight task and project tracking tool built with Node.js and Express.js. It serves as the backend for the MIRA application, providing APIs for user management, project management, card management, and more.

## Overview

MIRA is a clone of JIRA with an interactive kanban board created using React, MUI, and Redux in the frontend, and Node.js and Express.js in the backend. The backend is responsible for handling authentication, authorization, and serving data through a set of RESTful APIs.

## Live Application

The MIRA application is live and can be accessed at: [https://mira-pesto.netlify.app/](https://mira-pesto.netlify.app/)

## Backend Deployment

The backend is deployed on Netlify serverless.

## Technology Stack

The technology stack used in the MIRA backend includes:

- Node.js: JavaScript runtime for executing server-side code
- Express.js: Web application framework for building APIs
- MongoDB: NoSQL database for storing application data
- Firebase: Authentication and authorization services
- JWT: JSON Web Tokens for secure authentication

## API Documentation

The MIRA backend provides the following API endpoints:

- `/api/v1/users`: CRUD operations for user management
- `/api/v1/projects`: CRUD operations for project management
- `/api/v1/cards`: CRUD operations for card management
- `/api/v1/me`: Get current user profile
- `/api/v1/auth`: Authentication routes (login, register, etc.)

For detailed information on the API endpoints and their usage, refer to the API documentation.

## Codebase

The codebase for the MIRA backend is hosted on GitHub:

[https://github.com/pesto-students/mira---backend-mira](https://github.com/pesto-students/mira---backend-mira)

## Development Setup

To set up the MIRA backend locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/pesto-students/mira---backend-mira.git
   ```

2. Install dependencies:
    ```bash
    cd mira---backend-mira
    npm install
    ```
3. Configure environment variables:

- Create a .env file in the project root.
- Set the required environment variables, such as MongoDB connection string, Firebase credentials, etc.

4. Start the development server:
    
    ```bash
    npm start
    ```
The backend will be running at http://localhost:8000

## Future Improvements

- Improve code documentation and add JSDoc comments to functions and modules.
- Implement logging to track application events and errors.
- Add unit tests for critical functionality.
- Implement caching mechanisms to improve performance.
- Enhance error handling and implement consistent error responses.

Feel free to contribute to the project by submitting pull requests or opening issues for bug reports or feature requests.