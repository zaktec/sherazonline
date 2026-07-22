/*
 * SherazOnline JavaScript
 *
 * This file controls:
 * 1. Mobile navigation
 * 2. Private-page password checking
 * 3. Locking the private page
 */


/* ==================================================
   MOBILE NAVIGATION
   ================================================== */

/* Find every mobile menu button on the current page */
const menuButtons = document.querySelectorAll(".menu-button");

/* Add menu behaviour to each button */
menuButtons.forEach((menuButton) => {
    /* Find the ID of the menu controlled by this button */
    const menuId = menuButton.getAttribute("aria-controls");

    /* Find the matching menu */
    const menu = document.getElementById(menuId);

    /* Continue only when the menu exists */
    if (menu) {
        menuButton.addEventListener("click", () => {
            /* Open or close the menu */
            const menuIsOpen = menu.classList.toggle("is-open");

            /* Update accessibility information */
            menuButton.setAttribute(
                "aria-expanded",
                String(menuIsOpen)
            );
        });

        /* Close the mobile menu after a link is selected */
        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menu.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }
});


/* ==================================================
   PRIVATE PAGE ELEMENTS
   These elements exist only on private.html.
   ================================================== */

const passwordScreen = document.getElementById("password-screen");
const privateContent = document.getElementById("private-content");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const passwordMessage = document.getElementById("password-message");


/*
 * SHA-256 hash for the password:
 *
 * zaktec
 *
 * The visible password is not written into the comparison code.
 */
const correctPasswordHash =
    "0496ccfa64d648e0364ba57b8fd979a7b3627950fd088ea583948d9bd505a718";


/* ==================================================
   PASSWORD HASH FUNCTION
   Converts entered text into a SHA-256 hash.
   ================================================== */

async function createPasswordHash(password) {
    /* Convert the entered text into bytes */
    const passwordBytes = new TextEncoder().encode(password);

    /* Create the SHA-256 hash */
    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        passwordBytes
    );

    /* Convert the hash into readable hexadecimal characters */
    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}


/* ==================================================
   OPEN PRIVATE PAGE
   ================================================== */

function showPrivateContent() {
    /* Hide the password screen */
    passwordScreen.style.display = "none";

    /* Show the private content */
    privateContent.style.display = "block";

    /* Remember access while this browser tab remains open */
    sessionStorage.setItem("privateAccess", "allowed");

    /* Remove the typed password */
    passwordInput.value = "";

    /* Remove any previous error */
    passwordMessage.textContent = "";
}


/* ==================================================
   CHECK PASSWORD
   ================================================== */

async function checkPassword() {
    /* Read the password entered by the visitor */
    const enteredPassword = passwordInput.value;

    /* Stop when nothing was entered */
    if (enteredPassword.trim() === "") {
        passwordMessage.textContent = "Please enter the password.";
        passwordInput.focus();
        return;
    }

    /* Hash the entered password */
    const enteredPasswordHash =
        await createPasswordHash(enteredPassword);

    /* Compare the entered hash with the correct hash */
    if (enteredPasswordHash === correctPasswordHash) {
        showPrivateContent();
    } else {
        passwordMessage.textContent =
            "Incorrect password. Please try again.";

        passwordInput.value = "";
        passwordInput.focus();
    }
}


/* ==================================================
   LOCK PRIVATE PAGE
   ================================================== */

function lockPrivatePage() {
    /* Remove saved access */
    sessionStorage.removeItem("privateAccess");

    /* Hide private content */
    privateContent.style.display = "none";

    /* Show password screen again */
    passwordScreen.style.display = "flex";

    /* Clear messages and password */
    passwordMessage.textContent = "";
    passwordInput.value = "";

    /* Place the cursor in the password field */
    passwordInput.focus();
}


/* ==================================================
   PRIVATE PAGE EVENT LISTENERS
   Only run when the relevant elements exist.
   ================================================== */

if (
    passwordScreen &&
    privateContent &&
    passwordInput &&
    loginButton &&
    passwordMessage
) {
    /* Keep the page unlocked during the same browser tab */
    if (sessionStorage.getItem("privateAccess") === "allowed") {
        showPrivateContent();
    }

    /* Check password when the login button is clicked */
    loginButton.addEventListener("click", checkPassword);

    /* Check password when Enter is pressed */
    passwordInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            checkPassword();
        }
    });
}

/* Lock the page when the Lock Page button is clicked */
if (logoutButton) {
    logoutButton.addEventListener("click", lockPrivatePage);
}
