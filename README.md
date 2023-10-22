# Office Queue Management System

## Requirements

- Node.js (v18)
- npm

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

All commands have to be done in the `server` folder.

### Running

- Run `npm install` to install dependencies
- Run `npm run start` to start the server

### Testing

- Run `npm run test` to run tests

### API Endpoints

- GET `/`
  - parameters: none
  - response :
    - 200 : { message: string }
- GET `/counter/:id/callNextClient`
  - parameters:
    - id: number - the id of the counter
  - response :
    - 200 : { data: number } - the ticket number of the next client
    - 204 : { } - no client to call
    - 404 : { message: string } - counter with the given id not found

## Data structure

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

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)
