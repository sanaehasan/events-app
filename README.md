# events-app-api

this is the api that servers the api's endpoints to create and manage events

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file for tests ,development and production

`PGDATABASE`: name of your PGDATABASE

`SECRET_KEY`: the secret key that help create the user token

## Run Locally

Clone the project

```bash
  git clone https://github.com/sanaehasan/events-app.git
```

Go to the project directory

```bash
  cd events-app
```

Install dependencies

```bash
  npm install
```

set up the database

```bash
  npm run setup_dbs
```

seed the database

```bash
  npm run seed
```

set up the database

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Demo link

you can try all the api endpoints using this link

https://events-app-tryx.onrender.com/api
