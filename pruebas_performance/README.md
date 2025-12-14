# Performance Tests with k6

This directory contains performance tests for WeatherAPI using k6.

## Files

### Tests
- **`test/perfomance_test.js`**: Basic test that **randomly** selects a Uruguay department on each iteration. Useful for simulating realistic and distributed load.

- **`test/performance_test_scenarios.js`**: Test using **scenarios** that runs separate tests for each department with independent configurations (different VUs, duration, start times).

Both tests do the same thing (query weather for Uruguay departments), but demonstrate **two different ways to structure performance tests in k6**.

### Configuration
- **`.env`**: Contains the WeatherAPI API key (not committed to git)
- **`run-test.sh`**: Bash script that automatically loads variables from `.env` and runs k6

## Requirements

- [k6](https://k6.io/docs/get-started/installation/) installed
- API key from [WeatherAPI](https://www.weatherapi.com/) configured in `.env`

## Initial Setup

1. Create the `.env` file with your API key:
```bash
WEATHER_API_KEY=your_api_key_here
```

2. Give execution permissions to the script:
```bash
chmod +x run-test.sh
```

## Execution

### Using the script (recommended)
Automatically loads variables from `.env`:

```bash
# Test with random selection
./run-test.sh test/perfomance_test.js

# Test with scenarios
./run-test.sh test/performance_test_scenarios.js
```

### Using k6 directly
You must pass the API key manually:

```bash
# Option 1: Variable in the command
k6 run --env WEATHER_API_KEY=your_api_key test/perfomance_test.js

# Option 2: Export variable first
export WEATHER_API_KEY=your_api_key
k6 run test/perfomance_test.js

# Option 3: Load from .env
export $(cat .env | xargs) && k6 run test/perfomance_test.js
```

## Displayed Metrics

Tests are configured to show:
- **Response time**: average (avg), minimum (min), maximum (max)
- **Error rate**: `http_req_failed`
- **Throughput**: `http_reqs` (requests per second)

## Options Structure

Basic configuration in `options`:
```javascript
export const options = {
    vus: 1,              // Virtual users simultaneously
    duration: '10s',     // Test duration
    summaryTrendStats: ['avg', 'min', 'max']  // Statistics to display
};
```
