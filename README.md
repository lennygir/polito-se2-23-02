# Office Queue Management System

## Requirements

- Node.js (v18)
- npm

## Running

- Run `npm install` to install dependencies
- Run `npm run dev` to start the client
- Run `npm run start` to start the server

## Testing

- Run `npm run test` to run tests

## React Client Application Routes

- Route `/`: landing page
- Route `/admin`: admin dashboard
- Route `/officer/:id`: officer control panel
- Route `/client`: client page to get a new ticket

## API Server

All commands have to be done in the `server` folder.

### API Endpoints

- GET `/`
  - parameters: none
  - response :
    - 200 : { message: string }
- GET `/counter/:counterId/callNextClient`
  - parameters:
    - counterId: number - the id of the counter
  - response :
    - 200 : { data: number } - the ticket number of the next client
    - 204 : { } - no client to call
    - 404 : { message: string } - counter with the given id not found
- GET `/service/:serviceId/getTicket`
  - parameters:
    - serviceId: number - the id of the service
  - response :
    - 200 : { data: number } - the ticket number of the client
    - 404 : { message: string } - service does not exists or is not provided by a counter

## Data structures

```json
{
    "services": [
        {
            "id": <number>,
            "name": <string>,
            "serviceTime": <number>
        }
    ],
    "counters": [
        {
            "id": <number>,
            "services": <number[]>,
            "clients": <number[]>,
            "servedClient": <number>
        }
    ]
}
```

Note: the clients property in "counters" is a queue of ticket numbers

## Main React Components

- `ErrorPage` (in `ErrorPage.jsx`): component used to handle wrong client routes
- `LandingPage` (in `LandingPage.jsx`): component used to access the app with a different role (client, officer or admin)

## Screenshot

![Screenshot](./img/screenshot.jpg)
