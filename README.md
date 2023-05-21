# telemetry replay

## to run it

```bash
nvm use
```

node v10 is required

```bash
npm install

```

```bash
npm run start
```

## run tests

please take into account that the server needs to be running for all the test to properly run

```bash
npm run test

```

## env variables

setup your own env variables in .env file

### port

PORT={PORT_NUMBER}

### files

the paths are fixed to follow a certain structure

SIMULATION_FILENAME={FILENAME}
FRONTEND_FILENAME={FILENAME}

- simulation file: shoud go into /data
- frontend fime: should go into /public

_filename shoud include extension_

### config

- you can modify the rate at which data is being sent to the clients
- you can modify whether a readStream should be used to load the simulation file

STREAMING_INTERVAL={NUMBER (ms)}
USE_STREAMS={BOOLEAN}
