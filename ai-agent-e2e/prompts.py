BASE_PROMPT = """
### Prompt for QA regression agent

**Objective:**

You are a QA engineer performing regression testing. Execute the test flow below
step by step and verify every acceptance criterion.
- If the flow passes, log:  "{scenario_name}: PASSED".
- If the flow fails, or you are not sure it passed, log:
  "{scenario_name}: FAILED at step <N>" and add the probable root cause.

**Rules:**
- Mark the test as PASSED only if you are sure ALL steps were executed
  successfully and match the Acceptance Criteria.
- Use ONLY the test data provided in the flow. Do not invent or use any extra data.
- Log every interaction in the format: step_name: action_performed: selector_used
- Be efficient and accurate. Do not perform actions that are not in the steps.

---
*** Flow: {scenario_name} ***
---
**Steps:**
{steps}
"""


class E2EPrompt:

    def __init__(self, scenario_name: str, steps: str):
        self.scenario_name = scenario_name
        self.content = BASE_PROMPT.format(scenario_name=scenario_name, steps=steps)


CHECKOUT_E2E_PROMPT = E2EPrompt(
    "TC-01_Purchase_E2E",
    """
 1.  Navigate to https://www.saucedemo.com/.
 2.  Enter 'standard_user' into the Username field.
 3.  Enter 'secret_sauce' into the Password field.
 4.  Make sure Username and Password are filled in. If not, fill them in.
 5.  Click the 'Login' button.
 6.  Wait for the product list page (/inventory.html) to load.
 7.  Locate the product "Sauce Labs Backpack".
 8.  Click the "Add to cart" button for "Sauce Labs Backpack".
 9.  Verify the shopping cart badge shows "1".
 10. Click the shopping cart icon in the top-right corner.
 11. Verify the URL is /cart.html AND "Sauce Labs Backpack" is listed in the cart.
 12. Click the "Checkout" button.
 13. Verify the URL is /checkout-step-one.html.
 14. Enter 'Test' into the First Name field.
 15. Enter 'User' into the Last Name field.
 16. Enter '01001' into the Postal Code field.
 17. Click the "Continue" button.
 18. Verify the URL is /checkout-step-two.html and the order overview shows the item and totals.
 19. Click the "Finish" button.

 **Expected Result:**
 *   The URL is /checkout-complete.html.
 *   The confirmation message "Thank you for your order!" is displayed.
""",
)

LOGIN_POSITIVE_PROMPT = E2EPrompt(
    "TC-02_Login_Positive",
    """
 1.  Navigate to https://www.saucedemo.com/.
 2.  Enter 'standard_user' into the Username field.
 3.  Enter 'secret_sauce' into the Password field.
 4.  Make sure Username and Password are filled in. If not, fill them in.
 5.  Click the 'Login' button.

 **Expected Result:**
 *   The user is redirected to /inventory.html.
 *   The product/inventory list is visible.
""",
)

LOGIN_LOCKED_OUT_PROMPT = E2EPrompt(
    "TC-02_Login_LockedOut",
    """
 1.  Navigate to https://www.saucedemo.com/.
 2.  Enter 'locked_out_user' into the Username field.
 3.  Enter 'secret_sauce' into the Password field.
 4.  Make sure Username and Password are filled in. If not, fill them in.
 5.  Click the 'Login' button.

 **Expected Result:**
 *   The user stays on the login page (NOT redirected to /inventory.html).
 *   The error message 'Epic sadface: Sorry, this user has been locked out.' is displayed.
""",
)

LOGIN_WRONG_PASSWORD_PROMPT = E2EPrompt(
    "TC-02_Login_WrongPassword",
    """
 1.  Navigate to https://www.saucedemo.com/.
 2.  Enter 'standard_user' into the Username field.
 3.  Enter 'wrong_password' into the Password field.
 4.  Make sure Username and Password are filled in. If not, fill them in.
 5.  Click the 'Login' button.

 **Expected Result:**
 *   The user stays on the login page (NOT redirected to /inventory.html).
 *   The error message
     'Epic sadface: Username and password do not match any user in this service'
     is displayed.
""",
)

ALL_PROMPTS = [
    CHECKOUT_E2E_PROMPT,
    LOGIN_POSITIVE_PROMPT,
    LOGIN_LOCKED_OUT_PROMPT,
    LOGIN_WRONG_PASSWORD_PROMPT,
]