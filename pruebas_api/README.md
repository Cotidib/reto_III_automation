# API Automation Tests

API automation test suite for PokeAPI and SWAPI using Mocha and Chai.

## Project Structure

```
pruebas_api/
├── test/
│   ├── helpers/
│   │   └── api-client.js       # Shared HTTP client
│   ├── pokeapi/
│   │   └── pokemon.test.js     # PokeAPI test cases
│   ├── swapi/
│   │   └── people.test.js      # SWAPI test cases
│   └── integration/
│       └── cross-api.test.js   # Cross-API integration tests
├── package.json
└── README.md
```

## Setup

Install dependencies:

```bash
npm install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run PokeAPI tests only:
```bash
npm run test:pokeapi
```

Run SWAPI tests only:
```bash
npm run test:swapi
```

Run integration tests only:
```bash
npm run test:integration
```

## Dependencies

- **mocha**: Test framework
- **chai**: Assertion library
- **node-fetch**: HTTP client for making API requests

## APIs Under Test

- **PokeAPI**: https://pokeapi.co/
- **SWAPI**: https://swapi.info/
