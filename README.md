# Easy Meeting Server

You can use Easy Meeting to schedule events, ask others to participate, add your calendar availability and choose a date and time that works for all.

Enter your availability once and it will be shown on every event you participate.

## Getting Started

### Prerequisites

- Clone the repo
- Open a terminal and change directory into the root folder
- Run the following command to install the dependencies:

```
npm install
```

### Environment variables

This project depends on some environment variables.
If you are running this project locally, create a `.env` file at the root for these variables.
Your host provider should included a feature to set them there directly to avoid exposing them.

Here are the required ones:

```
DATABASE_URL=
SECRET_KEY=
```

### Run the project

Run the following command to run the project:

```
npm run connect
```

## Endpoints

You can use your favorite API test tool. Postman is suggested. Once you start the server locally, it will be available on `http://localhost:8080` (or any other port you select).

### Events

`http://localhost:8080/api/events`

| Endpoint                 | Method | Action                                               |
| ------------------------ | ------ | ---------------------------------------------------- |
| `/`                      | GET    | Get all events                                       |
| `/`                      | POST   | Create a new event                                   |
| `/:eventId`              | GET    | Get a single event by id                             |
| `/:eventId`              | DELETE | Delete an event                                      |
| `/:eventId/title`        | PUT    | Change the title of an event by event id             |
| `/:eventId/participants` | PUT    | Update the participants list of an event by event id |
| `/:eventId/timeSlots`    | PUT    | Update the time slots of an event by event id        |
| `/:eventId/archive`      | PUT    | Archive an event by event id                         |
| `/owner/:ownerId`        | GET    | Get all events owned by a single user by id          |

### Users

`http://localhost:8080/api/users`

| Endpoint            | Method | Action                                                  |
| ------------------- | ------ | ------------------------------------------------------- |
| `/`                 | GET    | Get all users                                           |
| `/:userId`          | GET    | Get a single user by id                                 |
| `/:userId/profile`  | PUT    | Update the first and the last name of a user by user id |
| `/:userId/password` | PUT    | Update the password of a user by user id                |

### User Availability

`http://localhost:8080/api/userAvailability`

| Endpoint            | Method | Action                                         |
| ------------------- | ------ | ---------------------------------------------- |
| `/`                 | GET    | Get all user availabilities                    |
| `/:userId`          | GET    | Get a single event by id                       |
| `/:userId`          | POST   | Create a new user availability                 |
| `/:userId`          | PUT    | Update the user availability by user id        |
| `/:userId`          | DELETE | Delete a user availability                     |
| `/:userId/events`   | PUT    | Update the events list for a user availability |
| `/:userId/timezone` | PUT    | Update the timezone of a user                  |

### Authentication

`http://localhost:8080/api/auth`

| Endpoint  | Method | Action                                  |
| --------- | ------ | --------------------------------------- |
| `/signup` | POST   | Create a new user                       |
| `/login`  | POST   | Authenticate a user login request       |
| `/logout` | POST   | Log out a user from the current session |
