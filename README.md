News Explorer — Backend 🌐

News Explorer is a full-stack application that allows users to search for news articles, save their favorite articles, and manage their personal saved-article collection.

This repository contains the backend API for News Explorer. It provides the foundation for user registration, authentication, authorization, and article management.

Technologies

- **Node.js** — JavaScript runtime
- **Express.js** — Backend web framework
- **MongoDB** — Database
- **Mongoose** — MongoDB object modeling
- **bcryptjs** — Password hashing
- **JSON Web Token (JWT)** — Authentication
- **Validator** — Input validation
- **Winston** — Application logging
- **express-winston** — HTTP request and error logging
- **dotenv** — Environment variable configuration

Project Structure

```text
News-Explorer-Back/
├── controllers/
│   ├── articles.js
│   ├── index.js
│   └── users.js
├── logs/
│   ├── error.log
│   └── request.log
├── middlewares/
│   ├── auth.js
│   └── errors.js
├── models/
│   ├── article.js
│   └── user.js
├── routes/
│   ├── articles.js
│   ├── index.js
│   └── users.js
├── utils/
│   ├── errors.js
│   └── logger.js
├── .env
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

Installation

### Prerequisites

- Node.js and npm
- MongoDB database
- Git

### Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/Agent610/News-Explorer-Back
   ```

2. Navigate into the project directory:

   ```bash
   cd News-Explorer-Back
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables in a local `.env` file:

   ```env
   PORT=3001

   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   Start the server in production mode using:

   ```bash
   npm start
   ```

API Endpoints

The following endpoints are planned for the backend.

| Method | Endpoint               | Description                              | Authentication |
| ------ | ---------------------- | ---------------------------------------- | -------------- |
| POST   | `/signup`              | Register a new user                      | Not required   |
| POST   | `/signin`              | Authenticate a user and return a JWT     | Not required   |
| GET    | `/users/me`            | Get the authenticated user's information | Required       |
| GET    | `/articles`            | Retrieve the user's saved articles       | Required       |
| POST   | `/articles`            | Save a new article                       | Required       |
| DELETE | `/articles/:articleId` | Delete a saved article                   | Required       |

Protected endpoints will require a valid JWT in the request's `Authorization` header.

```text
Authorization: Bearer
```

User Model

The user model will contain:

- `email` — Required, unique, and validated as an email address.
- `password` — Required hashed password, excluded from query results by default.
- `name` — Required username between 2 and 30 characters.

Passwords will be hashed before storage.

Article Model

The article model will contain:

- `keyword` — Search keyword associated with the article.
- `title` — Article title.
- `text` — Article text.
- `date` — Article publication date.
- `source` — Article source.
- `link` — URL to the original article.
- `image` — URL to the article image.
- `owner` — ID of the user who saved the article, excluded from query results by default.

Users will only be able to retrieve and delete articles that belong to their own account.

Logging

The backend will use JSON-formatted logs:

- `logs/request.log` — API request information.
- `logs/error.log` — API error information.

Log files and environment configuration will be excluded from version control.

Development Status

The backend project structure and initial Express server setup have been created. Database integration, API models, authentication, protected routes, and logging are being developed incrementally.

Project Goal

Build a secure backend API that integrates with the News Explorer frontend and supports user authentication and personal saved-article management.
