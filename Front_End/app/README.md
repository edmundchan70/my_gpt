# Awesome PDF Chat App

Welcome to Awesome PDF Chat App! This is a full-stack application written in TypeScript, featuring React for the frontend, NestJS for backend API services, and Prisma for seamless database manipulation. The app allows users to upload their PDF documents to the backend service and utilize the OpenAI API with Langchain to have interactive conversations with their documents. Additionally, a secure user authentication system has been implemented using JWT access and refresh tokens.

## Features

- Upload PDF: Users can upload their PDF documents to the backend, which are then stored securely in Amazon S3.
- OpenAI Integration: The app utilizes the power of OpenAI API with Langchain to enable users to have interactive conversations with their PDF documents.
- User Authentication: A robust user authentication system is implemented using JWT access and refresh tokens, ensuring secure access to the application.
- TypeScript: The entire application is written in TypeScript, providing type safety and better developer experience.
- React Frontend: The frontend is built using React, offering a modern and responsive user interface.
- NestJS Backend: The backend API services are developed using NestJS, a scalable and efficient framework for building server-side applications.
- Prisma Database: Prisma is used to handle database manipulation, simplifying the data access layer and improving database interactions.

## Getting Started

Follow these instructions to set up the Awesome PDF Chat App locally on your machine.

### Prerequisites

- Node.js: Make sure you have Node.js installed on your system. You can download it from the official website: https://nodejs.org

### Installation

1. Clone the repository:

```bash
git clone https://github.com/edmundchan70/my_gpt/tree/main/Front_End/app
```

2. Navigate to the project directory:

```bash
cd my_gpt
```

3. Install frontend and backend dependencies:

```bash
cd frontend/app
npm install

cd ../my_gpt_backend
npm install
```

4. Environment Variables:
    Create a `.env` file in the `backend` directory and provide the following environment variables:  
     
    REACT_APP_S3_BUCKET_NAME = ...
    REACT_APP_S3_BUCKET_REGION = ...
    REACT_APP_S3_ACCESS_KEY = ...
    REACT_APP_S3_SECRETE_KEY= ...

   Create a `.env` file in the `backend` directory and provide the following environment variables:

   ```plaintext
   OPENAI_API_KEY_TEST="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"
pinecone_env="us-west4-gcp-free"
pinecone_api_key="f35cff20-452d-477a-bef2-2c75ff0de693"

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

        DATABASE_URL=...
        RT_SECRET=...
        AT_SECRET=...
        S3_BUCKET_NAME =...
        S3_BUCKET_REGION = ...
        S3_ACCESS_KEY =...
        S3_SECRETE_KEY=...

   ```

   Replace `your_database_connection_string`, `your_jwt_secret`, `your_aws_access_key_id`, and `your_aws_secret_access_key` with your actual values.

### Running the App

1. Start the backend server:

```bash
cd backend
npm run start:dev
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

3. Open your web browser and visit `http://localhost:3000` to access the Awesome PDF Chat App.

## Contribution

Contributions to the Awesome PDF Chat App are welcome! If you find any issues or want to add new features, feel free to create a pull request.

## License

The Awesome PDF Chat App is licensed under the [MIT License](LICENSE).

## Acknowledgments

We would like to thank the open-source community for their valuable contributions and support.

Happy Chatting with your PDFs! 📚💬

---

**Note**: This README assumes that you have already set up the necessary AWS S3 bucket, Langchain API, and OpenAI API credentials to integrate with the app. If not, please refer to the respective documentation for setting them up.