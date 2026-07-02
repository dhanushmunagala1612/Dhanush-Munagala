# V Care Medicals — Patient Registration Portal

A full-stack front-end healthcare web application built with pure HTML5, CSS3, and JavaScript. This project implements a complete patient intake registration form with real-time validation, smart UX patterns, and data persistence — developed as a course project for MIS7375 at the University of Houston, C.T. Bauer College of Business.

---

## Live Demo

Open `index.html` directly in any modern browser — no server required.

---

## Features

### Form Sections
- **Identity** — First name, middle initial, last name, date of birth (MM/DD/YYYY auto-format), SSN (masked input, auto-formatted as XXX-XX-XXXX)
- **Address** — Address lines 1 & 2, city, state (dropdown with all 50 U.S. states + DC/PR), ZIP code (5-digit or ZIP+4)
- **Contact** — Email address, phone number (auto-formatted as (XXX) XXX-XXXX)
- **Account** — User ID, password with real-time strength indicator, confirm password
- **Medical** — Gender, insurance status/provider, medical history checkboxes (Chickenpox, Measles, Mumps, COVID-19, Tetanus), vaccination status, desired salary slider ($20K–$200K), estimated monthly rent/mortgage slider ($500–$5K), current symptoms/notes textarea

### Real-Time Validation Engine
- **Live regex validation** on every field as the user types
- **Auto-formatting** for DOB (MM/DD/YYYY), SSN (XXX-XX-XXXX), and phone ((XXX) XXX-XXXX) — digits-only input, separators inserted automatically
- **Password strength meter** — live checklist for lowercase, uppercase, number, special character, and minimum length (8–30 chars)
- **Password policy enforcement** — password cannot equal or contain user ID, first name, or last name
- **DOB boundary validation** — rejects future dates and dates more than 120 years ago
- **ZIP+4 support** — accepts 5-digit and 9-digit (ZIP+4) formats

### UX & Persistence
- **localStorage auto-save** — all non-sensitive fields silently persisted on every keystroke, preventing data loss on accidental close or refresh
- **Cookie-based returning user detection** — 48-hour expiry; returning users see their previously entered data auto-filled on page load
- **Review Panel** — "REVIEW" button reveals a side panel summarizing all entered data before submission
- **Live date display** — banner shows today's date dynamically via JavaScript
- **Thank You page** — `thankyou.html` loads on successful form submission

---

## File Structure

```
Dhanush-Munagala/
├── index.html              # Main patient registration form
├── scripts.js              # All form logic, validation, and UX behavior
├── style.css               # Styling — responsive layout, form components, sliders
├── thankyou.html           # Post-submission confirmation page
├── hospital-logo.png       # V Care Medicals branding logo
├── MIS7375 - HW2 - Pseudocode.pdf   # Assignment pseudocode documentation
└── MIS7375 - HW2 - Synopsis.pdf     # Assignment synopsis documentation
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements, ARIA roles, `aria-live` for alerts) |
| Styling | CSS3 (Flexbox, Grid, custom sliders, responsive layout) |
| Logic | JavaScript ES6+ (DOM manipulation, FormData API, regex, localStorage, cookies) |
| Persistence | `localStorage` (form auto-save) + `document.cookie` (returning user detection) |
| Validation | Native HTML5 constraint validation API + custom `setCustomValidity()` |

---

## How to Run

1. Clone or download the repository:
   ```bash
   git clone https://github.com/dhanushmunagala1612/Dhanush-Munagala.git
   ```
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. No dependencies, no npm install, no build step — it runs entirely in the browser.

---

## Key Implementation Details

### Auto-formatting inputs
Phone, SSN, and DOB fields strip all non-digit characters on input and re-insert separators on the fly — the user only types digits and the format appears automatically.

### Password strength
The strength checklist updates in real time as the user types. Each rule toggles between ❌ (invalid) and ✅ (valid) with corresponding CSS classes. The `setCustomValidity()` API blocks form submission until all rules pass.

### localStorage persistence
On every `input` event, all non-sensitive field values are written to `localStorage`. On page load, if a localStorage snapshot exists and no 48-hour returning-user cookie is set, the form is silently pre-populated with the last saved values.

### Review panel
Clicking "REVIEW" collects all form values via `FormData`, formats them, and populates a hidden `<aside>` panel which is then revealed and scrolled into view — without triggering form submission.

---

## Course Info

- **Course:** MIS7375 — Information Systems  
- **Institution:** University of Houston, C.T. Bauer College of Business  
- **Author:** Dhanush Munagala  
- **Version:** 3.0  

---

## Author

**Dhanush Munagala**  
M.S. Management Information Systems, University of Houston (4.0 GPA | Dean's Award)  
[LinkedIn](https://www.linkedin.com/in/dhanushmunagala/) · [GitHub](https://github.com/dhanushmunagala1612)
