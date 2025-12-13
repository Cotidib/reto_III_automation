from playwright.sync_api import Page

class BasePage:
    def __init__(self, page: Page):
        self.page = page
        self.search_input = "//input[@placeholder='Search IMDb']"

    def go_to(self, url):
        self.page.goto(url)

    def click(self, selector):
        self.page.click(selector)

    def search(self, search_term):
        self.page.fill(self.search_input, search_term)

    def press_enter(self, selector):
        self.page.press(selector, "Enter")

    def take_screenshot(self, step_name):
        screenshot_path = f"reports/screenshots/{step_name}.png"
        self.page.screenshot(path=screenshot_path)