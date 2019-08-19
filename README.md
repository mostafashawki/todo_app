# todo_app

Web based todo application with calendar feeds, and attached documents features

## Architecture

I use here a microservices architecture, with three APIs (Nodejs) with their independent database (Mongodb & In memory database) and environment.

![Architecture](/arch.jpg "App Architecture")

## Installation & Run (Backend)

### Auth API

cd auth-api

npm install

npm start

### Docs API

cd docs-api

npm install

npm start

### Todo API

cd todo/backend

npm install

npm start

## Testing (for Todo API)

cd todo/backend

npm test

## Frontend

cd todo/react-frontend

npm install

npm start
