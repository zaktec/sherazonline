"use strict";

/*
   SherazOnline shared JavaScript
   ----------------------------------------------------------
   This file only handles the responsive menu and footer year.
   It contains no passwords, secrets or private information.
*/

/* Find the menu controls. These exist on both HTML pages. */
const menuButton = document.querySelector(".menu-button");
const mainMenu = document.querySelector(".main-menu");

/* Close the menu and keep the accessibility state accurate. */
function closeMenu() {
    if (!menuButton || !mainMenu) {
        return;
    }

    mainMenu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
}

/* Switch between the open and closed mobile-menu states. */
function toggleMenu() {
    if (!menuButton || !mainMenu) {
        return;
    }

    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    const nextState = !isOpen;

    mainMenu.classList.toggle("is-open", nextState);
    menuButton.setAttribute("aria-expanded", String(nextState));
    menuButton.textContent = nextState ? "Close" : "Menu";
}

/* Open or close the menu when its button is selected. */
if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
}

/* Close the menu after any navigation link is selected. */
if (mainMenu) {
    mainMenu.querySelectorAll("a").forEach(function addLinkListener(link) {
        link.addEventListener("click", closeMenu);
    });
}

/* Let keyboard users close an open menu with Escape. */
document.addEventListener("keydown", function handleEscape(event) {
    if (event.key === "Escape") {
        closeMenu();

        if (menuButton) {
            menuButton.focus();
        }
    }
});

/* Reset the mobile state when the viewport returns to desktop size. */
window.addEventListener("resize", function handleResize() {
    if (window.innerWidth > 896) {
        closeMenu();
    }
});

/* Keep every footer year current without manual HTML edits. */
document.querySelectorAll("[data-current-year]").forEach(
    function updateYear(element) {
        element.textContent = String(new Date().getFullYear());
    }
);
