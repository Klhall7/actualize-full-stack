## Purpose

This project is tool for goal creation, task management learning targeted towards individuals who need help with organization, self-discipline and motivation. They can create and manage goals, any tasks aligned with those goals, set calendar deadlines, and measure their progress over time .

## Technologies & Frameworks Used

### Backend:

[FastAPI 0.110.0](https://fastapi.tiangolo.com/) web framework, used for database APIs
[Python 3.12.1](https://www.python.org/downloads/release/python-3122/) used for FastAPI setup.
[Supabase 2.4.0](https://supabase.com/docs/guides/database/overview) open-source backend-as-a-service solution. Supabase client database used for user tracking, authentication, login, and storage. Supabase leverages PostgreSQL for its core database functionality.

### Frontend:

[Vite 5.2.6 ](https://vitejs.dev/guide/) development server and bundler, used to build my React application.  
[React] (https://legacy.reactjs.org/) JavaScript library used for user interface.
[React Router v6.22.3](https://reacttraining.com/react-router) navigational components used for client side routing throughout the app.
[React Responsive Modal v6.1.0](https://react-responsive-modal.leopradel.com/) library used for UI when a logged in user creates and edits tasks from their dashboard.
[React Tooltip v5](https://react-tooltip.com/docs/getting-started) library used for giving user a guided experience when filling out forms on their dashboard
[date-fns v3](https://date-fns.org/) library used for formatting dates and showing user upcoming tasks

## User Authentication

Handling Separation Overview:
Supabase handles user accounts and JWTs.
FastAPI acts as a secure intermediary
JWTs unlock access to authorized data in Supabase.

1. Sign Up:

-   User enters email and password on the React frontend.
-   Frontend sends details to a FastAPI signup endpoint.
-   FastAPI uses Supabase to create a user in the auth.users table and gets a JWT.
-   FastAPI sends the JWT back to the frontend (login successful).

2. Sign In:

-   User enters email and password on the login form.
-   Frontend sends credentials to a FastAPI login endpoint.
-   astAPI uses Supabase to verify credentials.
-   If valid, Supabase generates a JWT with the user ID.
-   FastAPI sends the JWT back to the frontend (login successful).

3. Data Access:

-   Frontend stores the JWT securely (e.g., local storage)
-   Subsequent requests to FastAPI include the JWT in the header.
-   FastAPI verifies the JWT.
-   Based on the user ID and permissions, FastAPI performs authorized CRUD operations on public Supabase tables.

### Deployment and Hosting

[Platform.sh](https://auth.api.platform.sh/) backend server hosting
[Netlify](https://app.netlify.com/) frontend deployment

Both accounts are connected to my [Github Repository](https://github.com/Klhall7/actualize-full-stack) and it automatically deploys my code whenever I push changes to the repository branch.
