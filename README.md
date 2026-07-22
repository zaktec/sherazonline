# SherazOnline

SherazOnline is a small static website providing learner access and a public
overview of Sheraz Cheema's professional projects.

## File structure

- `index.html` — learner access homepage.
- `private.html` — password-screen professional hub. The old filename is
  retained so existing links continue to work.
- `css/style.css` — shared responsive styling for both pages.
- `js/main.js` — mobile navigation and automatic footer year.
- `js/private.js` — browser password check and tab-only access state.

## Publishing

Upload all files and folders without changing their relative structure. GitHub
Pages can publish the site directly from the repository's `main` branch.

Replace the old `js/private.js` with the new version in this package. The new
file stores a SHA-256 hash rather than the plain-text password.

## Security

This is a static website. Static HTML and JavaScript cannot securely protect
confidential content because visitors can download and inspect the files. The
password screen is only intended to discourage casual access.

For genuinely private material, use a service with server-side authentication
and authorisation.

## Changing the password

1. Choose a strong password that is not used for any other account.
2. Generate its SHA-256 hash locally. In a browser console, run:

   ```js
   const password = "YOUR NEW PASSWORD";
   const bytes = new TextEncoder().encode(password);
   const hash = await crypto.subtle.digest("SHA-256", bytes);
   console.log([...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join(""));
   ```

3. Copy the displayed hash into `PASSWORD_HASH` in `js/private.js`.
4. Do not put the plain-text password anywhere in the repository.
