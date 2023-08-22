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

## Highlights

The project showcases several standout features that underscore its robustness and adherence to best practices. Notably, the codebase prominently follows the DRY (Don't Repeat Yourself) principle, significantly reducing custom code for essential aspects such as error handling, data validation, and interactions with the database. This streamlined approach results in both efficiency and maintainability.

1. **Efficient Error Handling:**
   The project excels in centralizing error handling, encompassing data, database, and authentication errors, among other variations. This centralized approach resides in the [errorController.js](/src/controllers/errorController.js), mitigating the need for duplicated error-handling code. Upon encountering an error, an exception is raised, and the error controller orchestrates the appropriate response. This approach not only aligns with the DRY principle but also simplifies error management across the application.

2. **Seamless Data Validation:**
   The project employs a meticulous data validation strategy seamlessly integrated into the models through the ODM Mongoose. Crucial data validations, encompassing data schema integrity and duplicate data prevention, are all efficiently handled within the confines of the models themselves. This approach encapsulates data integrity concerns at their source, ensuring the reliability and consistency of the application's data.

3. **Factory Design Pattern for CRUD Operations:**
   Noteworthy is the utilization of the Factory Design Pattern to streamline CRUD (Create, Read, Update, Delete) operations across various models, encompassing users, projects, and cards. These operations are skillfully managed through the [handlerFactory.js](src/controllers/handlerFactory.js), employing the factory design pattern. This results in a coherent and maintainable approach to handling interactions with the database, enhancing code modularity.

4. **Robust Middleware Implementation:**
   The project incorporates a suite of industry-standard middleware packages to bolster the platform's security. By integrating packages like [Helmet](https://www.npmjs.com/package/helmet) for HTTP headers security, [mongoSanitize](https://www.npmjs.com/package/mongo-sanitize) to counter NoSQL query injection, and [hpp](https://www.npmjs.com/package/hpp) to fend off parameter pollution, the platform's security posture is significantly fortified. Additionally, measures against cross-site scripting ([XSS](https://www.npmjs.com/package/xss)) attacks and Cross-Origin Resource Sharing ([CORS](https://www.npmjs.com/package/cors)) issues are thoughtfully integrated.

5. **Tailored Custom Middlewares:**
   The project takes a granular approach to middleware, crafting custom middleware for specific tasks within the application's routes. This tailored middleware implementation includes vital functionalities such as user authentication, admin routing, and API response rate limiting. This approach allows for the modular implementation of diverse features while maintaining a high degree of code organization and clarity.

Collectively, these highlights underscore the project's commitment to clean code, optimal performance, and adherence to contemporary software engineering principles. The project not only embraces best practices but also demonstrates a keen understanding of architecture and security considerations, resulting in a reliable and maintainable application.

## Future Improvements

- Improve code documentation and add JSDoc comments to functions and modules.
- Implement logging to track application events and errors.
- Add unit tests for critical functionality.
- Implement caching mechanisms to improve performance.
- Enhance error handling and implement consistent error responses.

Feel free to contribute to the project by submitting pull requests or opening issues for bug reports or feature requests.
