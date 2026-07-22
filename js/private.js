"use strict";

/*
   SherazOnline browser access check
   ----------------------------------------------------------
   This provides a simple password screen for a static website.

   Important limitation:
   A static website cannot provide secure authentication. Visitors can inspect
   or download its HTML and JavaScript. Never place confidential information,
   learner records, API keys, financial details or private admin links here.
*/

/*
   SHA-256 hash of the current access password.
   Only the hash is stored here, not the plain-text password.

   See README.md before changing the password. A strong, unique password makes
   guessing harder, but it does not turn this into secure server authentication.
*/
const PASSWORD_HASH =
    "0496ccfa64d648e0364ba57b8fd979a7b3627950fd088ea583948d9bd505a718";

/* Store access only for the current browser tab. */
const SESSION_KEY = "sherazonlineProfessionalAccess";

/* Find all controls used by the access screen. */
const loginScreen = document.querySelector("#login-screen");
const protectedContent = document.querySelector("#protected-content");
const passwordForm = document.querySelector("#password-form");
const passwordInput = document.querySelector("#access-password");
const passwordError = document.querySelector("#password-error");
const togglePasswordButton = document.querySelector("#toggle-password");
const lockPageButton = document.querySelector("#lock-page");

/* Convert entered text into a lowercase SHA-256 hexadecimal string. */
async function createHash(value) {
    const encodedValue = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", encodedValue);

    return Array.from(new Uint8Array(digest))
        .map(function convertByte(byte) {
            return byte.toString(16).padStart(2, "0");
        })
        .join("");
}

/* Reveal the hub and remember access in this tab. */
function showProtectedContent() {
    if (!loginScreen || !protectedContent) {
        return;
    }

    sessionStorage.setItem(SESSION_KEY, "granted");
    loginScreen.hidden = true;
    protectedContent.hidden = false;
    document.body.classList.add("access-granted");

    /* Move keyboard focus to the main heading after sign-in. */
    const mainHeading = protectedContent.querySelector("h1");
    if (mainHeading) {
        mainHeading.setAttribute("tabindex", "-1");
        mainHeading.focus({ preventScroll: true });
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/* Hide the hub, clear this tab's access and reset the form. */
function showLoginScreen() {
    if (!loginScreen || !protectedContent) {
        return;
    }

    sessionStorage.removeItem(SESSION_KEY);
    protectedContent.hidden = true;
    loginScreen.hidden = false;
    document.body.classList.remove("access-granted");

    if (passwordInput) {
        passwordInput.value = "";
        passwordInput.type = "password";
        passwordInput.focus();
    }

    if (togglePasswordButton) {
        togglePasswordButton.textContent = "Show";
        togglePasswordButton.setAttribute("aria-label", "Show password");
    }

    if (passwordError) {
        passwordError.hidden = true;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/* Check the entered password without reloading the page. */
if (passwordForm && passwordInput) {
    passwordForm.addEventListener("submit", async function checkPassword(event) {
        event.preventDefault();

        const enteredHash = await createHash(passwordInput.value);

        if (enteredHash === PASSWORD_HASH) {
            showProtectedContent();
            return;
        }

        if (passwordError) {
            passwordError.hidden = false;
        }

        passwordInput.value = "";
        passwordInput.focus();
    });

    /* Remove the previous error as soon as another attempt begins. */
    passwordInput.addEventListener("input", function hideError() {
        if (passwordError) {
            passwordError.hidden = true;
        }
    });
}

/* Let the visitor show or hide the password they are typing. */
if (togglePasswordButton && passwordInput) {
    togglePasswordButton.addEventListener("click", function toggleVisibility() {
        const shouldShow = passwordInput.type === "password";
        passwordInput.type = shouldShow ? "text" : "password";
        togglePasswordButton.textContent = shouldShow ? "Hide" : "Show";
        togglePasswordButton.setAttribute(
            "aria-label",
            shouldShow ? "Hide password" : "Show password"
        );
        passwordInput.focus();
    });
}

/* The header button returns the visitor to the password screen. */
if (lockPageButton) {
    lockPageButton.addEventListener("click", showLoginScreen);
}

/* Restore access after refresh, but only inside the same browser tab. */
if (sessionStorage.getItem(SESSION_KEY) === "granted") {
    showProtectedContent();
} else {
    showLoginScreen();
}
