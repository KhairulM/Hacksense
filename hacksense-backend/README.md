# About
This is standard project of Node.js. The purpose of this standard project is giving guidance of project in order to create high quality software with high quality code.

# Development Environment Setup
## Installations
- Install Node Package Manager (npm).
- Install dependencies: `npm install`.

## Environments
Create file to store environment variables, such as `.env`. For simple configuration, define variables below:
```
NODE_ENV=development
KNEX_DB_NAME=db_name
PG_DEFAULT_HOST=localhost
PG_DEFAULT_USERNAME=user
PG_DEFAULT_PASSWORD=password
```

For more advanced configuration, please take a look at `config` folder.

## Initial Setup
- Install Node Package Manager (npm).
- Install Knex for migration: `npm install -g knex`.
- Install dependencies: `npm install`.

To use the environment variable when executing command, you can use executable file in cmds directory named `env`.

Before doing any further coding, setup the database schema using command below.
```
./cmds/env [your-environment-file] npm run migrate-latest
```

## Before Merge Request
You need to ensure the code quality and the code correctness. To ensure code correctness, you need to run tests. Running tests requires separate environment variables. You can create another environment variables for testing, such as `.env-test`, and set NODE_ENV to "test".

Do steps below:
1. Run `npm run lint` to ensure code quality. Fix any errors if needed.
2. Run `./cmds/env [your-test-environment-file] npm run migrate-latest`.
3. Run `./cmds/env [your-test-environment-file] npm run api-test`.
4. It is recommended to rollback your test database for another use. You can run `./cmds/env [your-test-environment-file] npm run migrate-rollback`.

### Development Commands:
- Check formatting: `npm run lint`. This is mandatory before making merge request.

# Run the Program
Don't forget to run latest migration first. To start the service, use command 
> ./cmds/env [your-environment-file] npm start

For development purpose, if you don't want to restart the server manually, you can use 

> /cmds/env [your-environment-file] npm run dev
