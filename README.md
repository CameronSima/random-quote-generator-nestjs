# Random Quote Generator - NestJS

This repository contains a REST API for retrieving quotes from characters in the TV show "The Office." The project is built using NestJS, a progressive Node.js framework.

## Table of Contents

- [Introduction](#introduction)
- [Endpoints](#endpoints)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Next Steps](#next-steps)

## Introduction

The Random Quote Generator is a NestJS application that provides a simple API for retrieving random quotes from "The Office" TV show. In addition to the basic endpoint for fetching random quotes, the application also includes additional endpoints for searching quotes by text or character using query parameters. The results are paginated to enhance the user experience.

## Additional Features

- Pagination support for retrieving quotes
- Query parameter support for searching quotes by text or character
  Relevant code can be found in the `quotes` module.
  `src/quotes/quotes.controller.ts`
  `src/quotes/quotes.service.ts`
  `src/quotes/utils.ts` - Quote filtering mechanism

## Endpoints

The following endpoints are available:

- `GET /quotes/random`: Retrieves a random quote from "The Office".
- `GET /quotes?text={searchText}`: Searches quotes containing the specified `searchText`.
- `GET /quotes?character={characterName}`: Searches quotes spoken by the specified `characterName`.
- `GET /quotes?text={searchText}&character={characterName}`: Searches quotes containing the specified `searchText` and spoken by the specified `characterName`.
- `GET /quotes?page={pageNumber}&limit={pageSize}`: Retrieves a paginated list of quotes. The `pageNumber` and `pageSize` query parameters are optional and default to `1` and `10` respectively.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

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

## Dependencies

The project relies on the following dependencies:

- Node.js: A JavaScript runtime environment.
- NestJS: A powerful Node.js framework for building scalable applications.

## Usage

1. Start the application: `npm run start:dev`
2. The API will be available at `http://localhost:3000`.
3. Use a tool like Postman (or just a browser) to send requests to the available endpoints.

Example usage:

- Retrieve a random quote: `GET http://localhost:3000/quotes/random`
- Search quotes by text: `GET http://localhost:3000/quote?text=cousin%20mose`
- Search quotes by character: `GET http://localhost:3000/quote?character=michael`
- Search quotes by text and character: `GET http://localhost:3000/quote?text=I%20can%20do%20it&character=dwight`

## Next Steps

If I were to continue working on this project, here are some next steps I would consider:

1. **Database Integration**: Currently, the quotes are stored in a JSON file in memory. To enhance scalability and persistence, I would integrate a database such as PostgreSQL or MongoDB. This allows for efficient storage, querying, and management of the quotes.
2. **Caching**: Implementing caching mechanisms can significantly improve performance by storing frequently accessed quotes in memory or using a distributed caching system like Redis. This reduces the load on the database and improves response times.
3. **Dockerization**: Containerizing the application using Docker would enable easier deployment and ensure consistency across different environments.
4. **Authentication and Authorization**: If this API were meant to be used by authenticated users, I would implement authentication and authorization mechanisms. This could involve using JWT (JSON Web Tokens) or other authentication strategies to secure the API endpoints.
