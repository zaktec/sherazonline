# SherazOnline brand guide

This file defines the visual and written conventions for the SherazOnline
website. Use it when changing pages so the learner experience remains clear and
consistent.

## Purpose and audience

SherazOnline gives college learners a direct route to their HAiBL course areas
and provides a secondary Staff Area. Learner actions must always take priority
over staff navigation.

## Brand name

- Write the name as **SherazOnline** with no space.
- Link the header brand to `index.html`.
- Keep the brand typographic; no image logo is required.

## Navigation labels

Use these labels on the homepage:

- Courses
- Contact
- Staff Area

Do not rename Staff Area to “Professional Hub”, “Professional Profile” or
“Private Area”. Keep it visually secondary to course-login buttons.

## Colours

The website uses a restrained monochrome palette defined as CSS variables in
`css/style.css`:

- Page background: `#000000`
- Raised surfaces: `#0d0d0d` and `#101010`
- Main text and headings: `#ffffff` or near-white
- Supporting text: `#b8b8b8`
- Borders: `#303030`
- Keyboard focus: `#ffbf47`

Always preserve strong contrast and a clearly visible keyboard focus indicator.

## Typography

- Use the system-friendly Arial/Helvetica sans-serif stack.
- Use sentence case for headings and buttons.
- Keep headings short and direct.
- Avoid decorative fonts, excessive weights and unnecessary uppercase text.

## Voice and wording

- Write concise, practical instructions.
- State each idea once.
- Prefer “course”, “lessons”, “assignments” and “resources”.
- Refer to the external learning platform as **HAiBL**.
- Do not repeat “learner login” throughout the same page.
- Do not publish placeholder contact details.

## Components

- Course-login buttons are the primary actions.
- Staff Area links use normal or secondary-link styling, never the primary
  button treatment.
- Cards use consistent padding, borders and heading order.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Internal links use relative GitHub Pages-safe paths.

## Responsive and accessible behaviour

- Build mobile-first and enhance the layout at wider breakpoints.
- Preserve semantic heading order: one `h1`, followed by `h2` section headings
  and `h3` card headings.
- Keep the skip link, visible focus styles and accurate menu `aria-expanded`
  state.
- The mobile menu must work with keyboard activation and close with Escape.

## Staff Area security note

`private.html` may use a client-side password screen to discourage casual
access, but this is not secure authentication. Static HTML and JavaScript are
publicly downloadable. Never store learner data, credentials, API keys,
financial information or other confidential material in the Staff Area.
