from behave import given, when, then
from playwright.sync_api import sync_playwright
from pages.home_page import HomePage
from pages.details_page import DetailsPage

@given("I am on the IMDb home page")
def step_impl(context):
    playwright = sync_playwright().start()
    context.browser = playwright.chromium.launch(headless=False)
    context.page = context.browser.new_page()
    context.home_page = HomePage(context.page)
    context.home_page.go_to("https://www.imdb.com/")

@when("I enter '{search_term}' on the search bar")
def step_impl(context, search_term):
    context.home_page = HomePage(context.page)
    context.home_page.search(search_term)

@when("I click 'search' button")
def step_impl(context):
    context.home_page = HomePage(context.page)
    context.home_page.press_enter(context.home_page.search_input)    

@when("I click on '{movie_title}' movie")
def step_impl(context, movie_title):
    context.home_page = HomePage(context.page)
    context.home_page.click(f"//a[.//*[text()='{movie_title}']]")

@then("the movie director is '{director_name}'")
def step_impl(context, director_name):
    context.details_page = DetailsPage(context.page)
    director_text = context.page.locator(context.details_page.director_selector).first.text_content()
    assert director_text == director_name, f"Expected '{director_name}' but got '{director_text}'"

@then("rating is higher than '7.0'")
def step_impl(context):
    context.details_page = DetailsPage(context.page)
    rating_text = context.page.locator(context.details_page.rating_selector).first.text_content()
    rating_value = float(rating_text)
    assert rating_value > 7.0, f"Expected rating > 7.0 but got {rating_value}"
    context.details_page.take_screenshot("rating_verification")
