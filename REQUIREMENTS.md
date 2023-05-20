# Backend test

You must develop a backend to replay telemetry data from a bike.

## Requirements

Either `Go v1.11` or `NodeJS v10.x`.

## Source control

Create a local Git repository and make several commits throughout the test development.

Each part of the test must be developed on its own branch (`part-x`) and merged to master when done.

All commit messages and code must be written in english.

## Delivery

Please compress the project folder (including the .git folder and excluding binaries) so when can evaluate the test's progress as well.

Deliver by e-mail at [miguelangelmejias@dorna.com](mailto:miguelangelmejias@dorna.com?subject=Backend%20test)

## Project

### Part 1

Load the simulation file from disk (file provided: `simfile.json`).

### Part 2

Load the frontend file from disk (file provided: `frontend.html`) and make it available at `http://0.0.0.0:3000`.

### Part 3

Implement the protocol needed for the frontend to work:

- The server always echoes the commands received.
- Once connected, the server sends the first data element available and resets the player state.
- When the client sends the `play` command, the backend begins sending data to the client.
- When the client sends the `stop` command, the backend stops sending data to the client.
- When the client sends the `reset` command, the backend resets its internal state (as if the client just connected).
- Once the replay reaches the end of the file, the player stops itself.

> See attached video `sample.mp4`

### Bonus points

- The server must optimize the available resources when sending data updates.
- Multiple clients should be able to simulate independently at the same time.
  > See attached video `sample-multiple-clients.mp4`
- Set the following variables via either .env file or environment variables:

  - `PORT`: http port
  - `PUBLIC_DIR`: path of the frontend file directory
  - `SIMFILE_DIR`: path of the simulation file directory

- Project structure
- Tests

## Application Protocol

### Frontend->Backend

```json
{
  "command": "play|stop|reset"
}
```

### Backend->Frontend

```json
{
  "kind": "status",
  "data": {
    "status": "stop"
  }
}
```

```json
{
  "kind": "data",
  "data": {
    "time": "09:00:00.000",
    "rpm": 1250,
    "gear": "1",
    "speed": 123.45
  }
}
```
