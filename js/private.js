"use strict";

/*
    SherazOnline private professional hub

    IMPORTANT SECURITY NOTICE

    This password check runs in the browser. It is only intended
    to stop casual visitors from immediately viewing the page.

    It is not secure authentication because visitors can inspect
    the JavaScript and HTML source files.

    Never store the following on this page:

    - learner information
    - customer records
    - confidential documents
    - financial information
    - passwords
    - API keys
    - private admin links
*/


/* =========================================================
   Configuration
   ========================================================= */

/*
    Replace this with your chosen password.

    Avoid using a password that you also use for:
    - email
    - banking
    - GitHub
    - HAiBL
    - any administrator account
*/

const PAGE_PASSWORD = "zaktec";

/*
    sessionStorage keeps access available in the current tab.
    Access will normally be removed when the tab is closed.
*/

const SESSION_KEY = "sherazonlinePrivateAccess";


/* =========================================================
   Page elements
   ========================================================= */

const loginScreen =
    document.querySelector("#login-screen");

const protectedContent =
    document.querySelector("#protected-content");

const passwordForm =
    document.querySelector("#password-form");

const passwordInput =
    document.querySelector("#access-password");

const passwordError =
    document.querySelector("#password-error");

const togglePasswordButton =
    document.querySelector("#toggle-password");

const lockPageButton =
    document.querySelector("#lock-page");

const menuButton =
    document.querySelector(".menu-toggle");

const navigation =
    document.querySelector(".primary-navigation");

const navigationLinks =
    document.querySelectorAll(
        ".primary-navigation a"
    );

const yearElement =
    document.querySelector("#current-year");


/* =========================================================
   Helper functions
   ========================================================= */

/**
 * Displays the protected professional page.
 */
function showProtectedPage() {
    if (!loginScreen || !protectedContent) {
        return;
    }

    sessionStorage.setItem(
        SESSION_KEY,
        "granted"
    );

    loginScreen.hidden = true;
    protectedContent.hidden = false;

    document.body.classList.add(
        "private-access-granted"
    );

    document.title =
        "Private Professional Hub | SherazOnline";

    window.scrollTo({
        top: 0,
        left: 0,
        behaviour: "instant"
    });

    /*
        Send keyboard focus to the main page heading
        where possible.
    */

    const mainHeading =
        protectedContent.querySelector("h1");

    if (mainHeading) {
        mainHeading.setAttribute(
            "tabindex",
            "-1"
        );

        mainHeading.focus({
            preventScroll: true
        });
    }
}


/**
 * Returns the visitor to the password screen.
 */
function showLoginScreen() {
    if (!loginScreen || !protectedContent) {
        return;
    }

    sessionStorage.removeItem(SESSION_KEY);

    protectedContent.hidden = true;
    loginScreen.hidden = false;

    document.body.classList.remove(
        "private-access-granted"
    );

    document.title =
        "Private Professional Hub | SherazOnline";

    closeMobileMenu();

    if (passwordInput) {
        passwordInput.value = "";
        passwordInput.type = "password";
    }

    if (togglePasswordButton) {
        togglePasswordButton.textContent =
            "Show";

        togglePasswordButton.setAttribute(
            "aria-label",
            "Show password"
        );
    }

    hidePasswordError();

    window.scrollTo({
        top: 0,
        left: 0,
        behaviour: "instant"
    });

    if (passwordInput) {
        passwordInput.focus();
    }
}


/**
 * Shows the incorrect-password message.
 */
function showPasswordError() {
    if (!passwordError) {
        return;
    }

    passwordError.hidden = false;
}


/**
 * Hides the incorrect-password message.
 */
function hidePasswordError() {
    if (!passwordError) {
        return;
    }

    passwordError.hidden = true;
}


/**
 * Closes the mobile navigation.
 */
function closeMobileMenu() {
    if (!menuButton || !navigation) {
        return;
    }

    navigation.classList.remove("is-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.textContent = "Menu";
}


/**
 * Opens or closes the mobile navigation.
 */
function toggleMobileMenu() {
    if (!menuButton || !navigation) {
        return;
    }

    const menuIsOpen =
        menuButton.getAttribute(
            "aria-expanded"
        ) === "true";

    const newState = !menuIsOpen;

    navigation.classList.toggle(
        "is-open",
        newState
    );

    menuButton.setAttribute(
        "aria-expanded",
        String(newState)
    );

    menuButton.textContent =
        newState ? "Close" : "Menu";
}


/**
 * Shows or hides the entered password.
 */
function togglePasswordVisibility() {
    if (
        !passwordInput ||
        !togglePasswordButton
    ) {
        return;
    }

    const passwordIsHidden =
        passwordInput.type === "password";

    passwordInput.type =
        passwordIsHidden
            ? "text"
            : "password";

    togglePasswordButton.textContent =
        passwordIsHidden
            ? "Hide"
            : "Show";

    togglePasswordButton.setAttribute(
        "aria-label",
        passwordIsHidden
            ? "Hide password"
            : "Show password"
    );

    passwordInput.focus();
}


/**
 * Updates the footer year automatically.
 */
function updateCurrentYear() {
    if (!yearElement) {
        return;
    }

    yearElement.textContent =
        String(new Date().getFullYear());
}


/* =========================================================
   Password form
   ========================================================= */

if (passwordForm && passwordInput) {
    passwordForm.addEventListener(
        "submit",
        function handlePasswordSubmit(event) {
            event.preventDefault();

            const enteredPassword =
                passwordInput.value.trim();

            if (
                enteredPassword ===
                PAGE_PASSWORD
            ) {
                hidePasswordError();
                showProtectedPage();
                return;
            }

            showPasswordError();

            passwordInput.value = "";
            passwordInput.focus();
        }
    );
}


/*
    Remove the error as soon as the visitor starts
    entering another password.
*/

if (passwordInput) {
    passwordInput.addEventListener(
        "input",
        hidePasswordError
    );
}


/* =========================================================
   Show and hide password button
   ========================================================= */

if (togglePasswordButton) {
    togglePasswordButton.addEventListener(
        "click",
        togglePasswordVisibility
    );
}


/* =========================================================
   Lock-page button
   ========================================================= */

if (lockPageButton) {
    lockPageButton.addEventListener(
        "click",
        showLoginScreen
    );
}


/* =========================================================
   Mobile navigation
   ========================================================= */

if (menuButton && navigation) {
    menuButton.addEventListener(
        "click",
        toggleMobileMenu
    );
}


/*
    Close the mobile menu after a navigation link
    has been selected.
*/

navigationLinks.forEach(
    function addNavigationListener(link) {
        link.addEventListener(
            "click",
            closeMobileMenu
        );
    }
);


/*
    Close the mobile menu when Escape is pressed.
*/

document.addEventListener(
    "keydown",
    function handleKeyboardActions(event) {
        if (event.key === "Escape") {
            if (
                navigation &&
                navigation.classList.contains(
                    "is-open"
                )
            ) {
                closeMobileMenu();

                if (menuButton) {
                    menuButton.focus();
                }

                return;
            }

            /*
                Escape also hides a visible password.
            */

            if (
                passwordInput &&
                passwordInput.type === "text"
            ) {
                passwordInput.type =
                    "password";

                if (togglePasswordButton) {
                    togglePasswordButton.textContent =
                        "Show";

                    togglePasswordButton.setAttribute(
                        "aria-label",
                        "Show password"
                    );
                }
            }
        }
    }
);


/*
    Close the menu automatically if the browser is
    resized from mobile to desktop size.
*/

window.addEventListener(
    "resize",
    function handleWindowResize() {
        if (window.innerWidth > 928) {
            closeMobileMenu();
        }
    }
);


/* =========================================================
   Initial page state
   ========================================================= */

function initialisePrivatePage() {
    updateCurrentYear();

    const accessWasGranted =
        sessionStorage.getItem(
            SESSION_KEY
        ) === "granted";

    if (accessWasGranted) {
        showProtectedPage();
        return;
    }

    showLoginScreen();
}

initialisePrivatePage();

