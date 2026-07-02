# V Care Medicals — Patient Registration Portal

A front-end healthcare web application built with pure HTML5, CSS3, and JavaScript, implementing a complete patient intake registration form with real-time validation, smart UX patterns, and session persistence.

**Developed as a course project for MIS7375 — Information Systems**  
University of Houston, C.T. Bauer College of Business

---

## 🌐 Live Demo

**[https://dhanushmunagala1612.github.io/Dhanush-Munagala/](https://dhanushmunagala1612.github.io/Dhanush-Munagala/)**

No installation or server required — runs entirely in the browser.

---

## 📋 Features

### Form Sections

The registration form is organized into five clearly labeled sections:

| Section | Fields |
|---|---|
| **Identity** | First name, middle initial, last name, date of birth (MM/DD/YYYY), SSN (masked, auto-formatted as XXX-XX-XXXX) |
| **Address** | Address line 1 & 2, city, state (all 50 U.S. states + DC & PR), ZIP code (5-digit or ZIP+4) |
| **Contact** | Email address, phone number (auto-formatted as (XXX) XXX-XXXX) |
| **Account** | User ID, password with live strength indicator, confirm password |
| **Medical** | Gender, insurance status & provider, medical history checkboxes, vaccination status, desired salary slider ($20K–$200K), estimated monthly rent/mortgage slider ($500–$5K), current symptoms/notes textarea |

### Real-Time Validation Engine

- Live regex validation on every field as the user types
- Auto-formatting for DOB, SSN, and phone — user types digits only, separators are inserted automatically
- Password strength meter with a live checklist (lowercase, uppercase, number, special character, 8–30 character length)
- Password policy enforcement — password cannot equal or contain the user ID, first name, or last name
- DOB boundary validation — rejects future dates and dates more than 120 years ago
- ZIP+4 support — accepts both 5-digit and 9-digit (XXXXX-XXXX) formats

### UX & Persistence

- **localStorage auto-save** — all non-sensitive fields are silently persisted on every keystroke, preventing data loss on accidental close or refresh
- **Cookie-based returning user detection** — 48-hour expiry; returning users have their previously entered data auto-filled on page load
- **Review Panel** — a "REVIEW" button reveals a slide-in side panel summarizing all entered data before submission, without triggering the form submit
- **Live date display** — the header banner shows today's date dynamically via JavaScript
- **Thank You page** — a confirmation page (`thankyou.html`) loads on successful form submission

---

## 🗂️ File Structure

```
Dhanush-Munagala/
├── index.html                        # Main patient registration form
├── scripts.js                        # All form logic, validation, and UX behavior
├── style.css                         # Responsive layout, form components, sliders
├── thankyou.html                     # Post-submission confirmation page
├── hospital-logo.png                 # V Care Medicals branding logo
├── MIS7375 - HW2 - Pseudocode.pdf   # Assignment pseudocode documentation
└── MIS7375 - HW2 - Synopsis.pdf     # Assignment synopsis documentation
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements, ARIA roles, `aria-live` for alerts) |
| Styling | CSS3 (Flexbox, Grid, custom sliders, responsive layout) |
| Logic | JavaScript ES6+ (DOM manipulation, FormData API, regex, localStorage, cookies) |
| Persistence | `localStorage` (form auto-save) + `document.cookie` (returning user detection) |
| Validation | Native HTML5 constraint validation API + custom `setCustomValidity()` |

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/dhanushmunagala1612/Dhanush-Munagala.git
cd Dhanush-Munagala
```

Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).  
No dependencies, no `npm install`, no build step required.

Or simply visit the **[live deployment](https://dhanushmunagala1612.github.io/Dhanush-Munagala/)** directly.

---

## 🔍 Key Implementation Details

**Auto-formatting inputs**  
The phone, SSN, and DOB fields strip all non-digit characters on each `input` event and re-insert separators on the fly — the user only types digits and the correctly formatted value appears automatically.

**Password strength meter**  
The strength checklist updates in real time as the user types. Each rule toggles between ❌ and ✅ with corresponding CSS classes. The `setCustomValidity()` API blocks form submission until all rules are satisfied.

**localStorage persistence**  
On every `input` event, all non-sensitive field values are written to `localStorage`. On page load, if a saved snapshot exists and no 48-hour returning-user cookie is present, the form is silently pre-populated with the last saved values.

**Review panel**  
Clicking "REVIEW" collects all current form values via the `FormData` API, formats them, and injects them into a hidden `<aside>` panel which is then revealed and scrolled into view — without triggering form submission.

---

## 📚 Course Info

| | |
|---|---|
| **Course** | MIS7375 — Information Systems |
| **Institution** | University of Houston, C.T. Bauer College of Business |
| **Author** | Dhanush Munagala |
| **Version** | 3.0 |

---

## 👤 Author

**Dhanush Munagala**  
M.S. Management Information Systems, University of Houston *(4.0 GPA | Dean's Award)*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/dhanushmunagala)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)](https://github.com/dhanushmunagala1612)
