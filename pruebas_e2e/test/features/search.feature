Feature: Search in IMDb

  Scenario: Successful search
    Given I am on the IMDb home page
    When I enter 'Home Alone' on the search bar
    When I click 'search' button
    When I click on 'Home Alone' movie
    Then the movie director is 'Chris Columbus'
    Then rating is higher than '7.0'