from pages.base_page import BasePage

class DetailsPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.director_selector = "//span[text()='Director']/following-sibling::div//a"
        self.rating_selector = "//div[@data-testid='hero-rating-bar__aggregate-rating__score']//span"