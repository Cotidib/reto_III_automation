# IMDb E2E Tests

End-to-end automated testing project for the IMDb website using Behavior-Driven Development (BDD).

## Description

This project implements automated tests for IMDb navigation and search, verifying functionalities such as:
- Movie search
- Director information verification
- Rating validation

## Technologies and Frameworks

- **Python 3.12+**: Base programming language
- **Playwright**: Web browser automation framework
- **Behave**: BDD framework for writing tests in natural language (Gherkin)
- **Allure**: Test reporting framework
- **Pytest**: Additional testing framework

## Project Structure

```
pruebas_e2e/
├── test/
│   ├── features/              # BDD feature files
│   │   ├── steps/            # Behave step implementations
│   │   │   └── search_steps.py
│   │   └── search.feature    # Test scenarios in Gherkin
│   ├── pages/                # Page Object Model (POM)
│   │   ├── base_page.py      # Base class with common methods
│   │   ├── home_page.py      # IMDb home page
│   │   └── details_page.py   # Movie details page
│   ├── environment.py        # Behave hooks configuration
│   ├── behave.ini           # Behave configuration
│   └── requirements.txt     # Project dependencies
└── reports/                 # Folder for screenshots and reports
    └── screenshots/
```

### Page Object Model (POM) Pattern

The project uses the POM pattern to keep code organized and maintainable:

- **BasePage**: Base class containing common methods (click, search, take_screenshot, etc.)
- **HomePage**: Methods and selectors specific to the home page
- **DetailsPage**: Methods and selectors specific to the movie details page

## Prerequisites

- Python 3.12 or higher
- pip (Python package manager)

## Installation

1. Clone the repository or navigate to the project directory:
```bash
cd /home/coti/facultad/reto_III_automation/pruebas_e2e
```

2. Create a virtual environment (recommended):
```bash
python -m venv .venv
source .venv/bin/activate  # On Linux/Mac
# or
.venv\Scripts\activate  # On Windows
```

3. Install dependencies:
```bash
cd test
pip install -r requirements.txt
```

4. Install Playwright browsers:
```bash
playwright install
```

## Running Tests

### Run all tests

From the `test/` directory:
```bash
behave
```

### Run a specific feature

```bash
behave features/search.feature
```

### Run with specific format

```bash
behave --format pretty
```

### Run in headless mode

By default, tests run in non-headless mode (you can see the browser). To run in headless mode, modify the `search_steps.py` file and change:
```python
context.browser = playwright.chromium.launch(headless=False)
```
to:
```python
context.browser = playwright.chromium.launch(headless=True)
```

## Configuration

### behave.ini

The `behave.ini` file contains Behave configuration:
- **format**: Output format (pretty, progress, json, etc.)
- **show_timings**: Show execution times
- **show_skipped**: Show skipped scenarios

## Reports

### Screenshots

Screenshots are automatically saved to `reports/screenshots/` after running tests.

### Allure Reports (optional)

To generate reports with Allure:
```bash
behave -f allure_behave.formatter:AllureFormatter -o reports/allure
allure serve reports/allure
```

## Example Scenarios

```gherkin
Feature: Search in IMDb

  Scenario: Successful search
    Given I am on the IMDb home page
    When I enter 'Home Alone' on the search bar
    When I click 'search' button
    When I click on 'Home Alone' movie
    Then the movie director is 'Chris Columbus'
    Then rating is higher than '7.0'
```

## XPath Selectors

The project uses XPath selectors to locate elements on the page:
- Flexible and not dependent on specific CSS classes
- Centralized in Page Object classes
- Easy to maintain and update

## Troubleshooting

### Error: "No steps directory"
Make sure to run `behave` from the `test/` directory.

### Error: "playwright not found"
Run `playwright install` to install the required browsers.

### Screenshots not saving
Verify that the `reports/screenshots/` directory exists. If not, create it:
```bash
mkdir -p reports/screenshots
```

## Contributing

To add new tests:
1. Create or modify `.feature` files in `features/`
2. Implement corresponding steps in `features/steps/`
3. Add necessary selectors and methods to Page Object classes
4. Run tests to verify

## Resources

- [Playwright Documentation](https://playwright.dev/python/)
- [Behave Documentation](https://behave.readthedocs.io/)
- [Reference Tutorial](https://medium.com/@antonio.uxcreator/step-by-step-playwright-with-behave-bdd-and-allure-reports-implementation-tutorial-34dbe2ff009a)
