import NavigateAppPage from '../../common/NavigateAppPage.win';
import MenuButtonPageObject, { MenuButtonSelector } from '../pages/MenuButtonPageObject.win';
import { PAGE_TIMEOUT, BOOT_APP_TIMEOUT, MENUBUTTON_A11Y_ROLE, Keys } from '../../common/consts';
import { MENU_BUTTON_ACCESSIBILITY_LABEL, MENU_BUTTON_TEST_COMPONENT_LABEL } from '../../../TestComponents/MenuButton/consts';
import { ComponentSelector } from '../../common/BasePage.win';

// Before testing begins, allow up to 60 seconds for app to open
describe('MenuButton Testing Initialization', function () {
  it('Wait for app load', () => {
    NavigateAppPage.waitForPageDisplayed(BOOT_APP_TIMEOUT);
    expect(NavigateAppPage.isPageLoaded()).toBeTruthy(NavigateAppPage.ERRORMESSAGE_APPLOAD);
  });

  it('Click and navigate to MenuButton test page', () => {
    /* Scroll to component test page button in scrollview if not already visible*/
    MenuButtonPageObject.scrollToComponentButton();
    MenuButtonPageObject.waitForButtonDisplayed(PAGE_TIMEOUT);

    /* Click on component button to navigate to test page */
    NavigateAppPage.clickAndGoToMenuButtonPage();
    MenuButtonPageObject.waitForPageDisplayed(PAGE_TIMEOUT);

    expect(MenuButtonPageObject.isPageLoaded()).toBeTruthy(MenuButtonPageObject.ERRORMESSAGE_PAGELOAD);
    expect(MenuButtonPageObject.didAssertPopup()).toBeFalsy(MenuButtonPageObject.ERRORMESSAGE_ASSERT); // Ensure no asserts popped up
  });
});

/* This will be re-enabled with a MenuButton Bug is fixed. Currently in PR - "Integrating accessibilityLabel functionality for MenuButton #1117" */
describe('MenuButton Accessibility Testing', () => {
  /* Scrolls and waits for the MenuButton to be visible on the Test Page */
  beforeEach(() => {
    MenuButtonPageObject.scrollToTestElement();
    MenuButtonPageObject.waitForPrimaryElementDisplayed(PAGE_TIMEOUT);
  });

  it('MenuButton - Validate accessibilityRole is correct', () => {
    expect(MenuButtonPageObject.getAccessibilityRole()).toEqual(MENUBUTTON_A11Y_ROLE);
    expect(MenuButtonPageObject.didAssertPopup()).toBeFalsy(MenuButtonPageObject.ERRORMESSAGE_ASSERT);
  });

  it('MenuButton - Set accessibilityLabel', () => {
    expect(MenuButtonPageObject.getAccessibilityLabel(ComponentSelector.Primary)).toEqual(MENU_BUTTON_ACCESSIBILITY_LABEL);
    expect(MenuButtonPageObject.didAssertPopup()).toBeFalsy(MenuButtonPageObject.ERRORMESSAGE_ASSERT);
  });

  it('Do not set accessibilityLabel -> Default to MenuButton label', () => {
    expect(MenuButtonPageObject.getAccessibilityLabel(ComponentSelector.Secondary)).toEqual(MENU_BUTTON_TEST_COMPONENT_LABEL);
    expect(MenuButtonPageObject.didAssertPopup()).toBeFalsy(MenuButtonPageObject.ERRORMESSAGE_ASSERT);
  });
});

describe('MenuButton Functional Testing', () => {
  /* Scrolls and waits for the MenuButton to be visible on the Test Page */
  beforeEach(() => {
    MenuButtonPageObject.scrollToTestElement();
    MenuButtonPageObject.waitForPrimaryElementDisplayed(PAGE_TIMEOUT);

    MenuButtonPageObject.sendKey(MenuButtonSelector.MenuButton, Keys.Escape); // Reset MenuButton state for next test
  });

  it('Click on MenuButton and validate that the list of Menu Items open', () => {
    /* Click on the MenuButton */
    MenuButtonPageObject.clickComponent();
    MenuButtonPageObject.waitForMenuItemsToOpen(PAGE_TIMEOUT);

    expect(MenuButtonPageObject.menuItemDisplayed()).toBeTruthy();
    expect(MenuButtonPageObject.didAssertPopup()).toBeFalsy(MenuButtonPageObject.ERRORMESSAGE_ASSERT);
  });

  it('Type "SpaceBar" to select the MenuButton and validate that the list of Menu Items open', () => {
    /* Type a space on the MenuButton */
    MenuButtonPageObject.sendKey(MenuButtonSelector.MenuButton, Keys.Spacebar);
    MenuButtonPageObject.waitForMenuItemsToOpen(PAGE_TIMEOUT);

    expect(MenuButtonPageObject.menuItemDisplayed()).toBeTruthy();
    expect(MenuButtonPageObject.didAssertPopup()).toBeFalsy(MenuButtonPageObject.ERRORMESSAGE_ASSERT);
  });

  /* Runs after all tests. This ensures the MenuButton closes. If it stays open, the test driver won't be able to close the test app */
  afterAll(() => {
    MenuButtonPageObject.sendKey(MenuButtonSelector.MenuButton, Keys.Escape);
  });
});
