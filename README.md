## Description

NestJS project for 8Tech back end

## What you needed for running this app
- Docker
- Postman for testing the API (https://app.getpostman.com/join-team?invite_code=e0e7b65e126ce79fc879b924d09c01c7&target_code=d13481477e7c93f4ae01086238224357)
- Node JS installed on your device (14 minimum, >=18 recommended)

## Installation

Set the database environment on docker
```bash
$ docker compose up
```

Installing project

```bash
$ npm install
```
Run prisma migration & seeding

```bash
$ npm run migrate
```
## Running the app

```bash
# development
$ npm run start

# development with hot reload
$ npm run dev

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
