// ===============================
// scripts.js — V Care Medicals Patient Form (FINAL CLEAN)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  // ---------------- Banner date ----------------
  const todayStr = document.getElementById("todayStr");
  if (todayStr) {
    const today = new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    todayStr.textContent = today;
  }

  // ---------------- Small helpers ----------------
  const byId = (id) => document.getElementById(id);
  const setError = (input, errEl, msg) => {
    if (errEl) errEl.textContent = msg || "";
    if (input) input.setCustomValidity(msg || "");
  };

  // ---------------- Review Panel ----------------
  const reviewBtn = byId("reviewBtn");
  const reviewPanel = byId("reviewPanel");
  const form = document.querySelector("form");

  if (reviewBtn && reviewPanel && form) {
    reviewBtn.addEventListener("click", () => {
      const fd = new FormData(form);
      const get = (n) => fd.get(n) || "";
      const r = (id) => byId(id);

      // Name
      if (r("r_name")) {
        const name = `${get("firstname")} ${get("middleinit") || ""} ${get("lastname")}`
          .replace(/\s+/g, " ")
          .trim();
        r("r_name").textContent = name;
      }

      // DOB
      if (r("r_dob")) r("r_dob").textContent = get("dob");

      // Email / Phone
      if (r("r_email")) r("r_email").textContent = get("email");
      if (r("r_phone")) r("r_phone").textContent = get("phone1");

      // Address
      const a1 = get("address1") || get("addr1") || "";
      const a2 = get("address2") || get("addr2") || "";
      const city = get("city");
      const state = get("state");
      // Truncate ZIP to first 5 for display per spec
      const zipRaw = (get("zip") || "").replace(/[^\d-]/g, "");
      const zip5 = zipRaw.replace(/\D/g, "").slice(0, 5);

      if (r("r_addr1")) r("r_addr1").textContent = a1;
      if (r("r_addr2")) r("r_addr2").textContent = a2;
      if (r("r_city_state_zip")) r("r_city_state_zip").textContent = `${city}, ${state} ${zip5}`.trim();

      // History (checkboxes as per your HTML names)
      const history = [];
      ["chickenpox", "measles", "mumps", "covid19"].forEach((n) => {
        const val = fd.get(n);
        if (val) history.push(val);
      });
      if (r("r_history")) r("r_history").textContent = history.join(", ") || "None";

      // Vaccinated
      if (r("r_vax")) r("r_vax").textContent = get("vaccinated") || "N/A";

      // Salary (from live label)
      if (r("r_salary")) {
        const sv = byId("salaryValue");
        r("r_salary").textContent = sv ? sv.textContent : "";
      }
      // Home Budget (from live label)
if (r("r_homeBudget")) {
  const hv = byId("homeBudgetValue");
  r("r_homeBudget").textContent = hv ? hv.textContent : "";
}


      // Symptoms
      if (r("r_symptoms")) r("r_symptoms").textContent = get("symptoms") || "None";

      // User ID (lowercased)
      if (r("r_userid")) r("r_userid").textContent = (get("userid") || "").toLowerCase();

      // Password (you might want to hide in production)
      if (r("r_password")) r("r_password").textContent = get("password");

      reviewPanel.hidden = false;
      reviewPanel.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ---------------- Password match + strength ----------------
  const password = byId("password");
  const confirm = byId("confirm_password");
  if (password && confirm) {
    confirm.addEventListener("input", () => {
      confirm.setCustomValidity(confirm.value !== password.value ? "Passwords do not match" : "");
    });
  }

  // Live strength box (your UI)
  const msgBox = byId("passwordMessage");
  const pLower = byId("p-lower");
  const pUpper = byId("p-upper");
  const pNum = byId("p-number");
  const pSpec = byId("p-special");
  const pLen = byId("p-length");

  const setValid = (el, ok) => {
    if (!el) return;
    el.classList.toggle("valid", ok);
    el.classList.toggle("invalid", !ok);
    el.textContent = el.textContent.replace(ok ? "❌" : "✅", ok ? "✅" : "❌");
  };

  if (password && msgBox) {
    password.addEventListener("focus", () => (msgBox.style.display = "block"));
    password.addEventListener("blur", () => (msgBox.style.display = "none"));
    password.addEventListener("input", () => {
      const v = password.value || "";
      setValid(pLower, /[a-z]/.test(v));
      setValid(pUpper, /[A-Z]/.test(v));
      setValid(pNum, /\d/.test(v));
      // allowed specials; exclude double quote explicitly
      setValid(pSpec, /[!@#$%^&*()_\-+~<>/.,`\\|[\]{}?:;=]/.test(v) && !/"/.test(v));
      setValid(pLen, v.length >= 8 && v.length <= 30);
    });
  }

  // Extra password rules vs user fields
  const firstNameField = byId("firstname");
  const lastNameField = byId("lastname");
  const userIdField = byId("userid");

  const passwordPolicyCheck = () => {
    if (!password) return;
    const v = password.value || "";
    const uid = (userIdField?.value || "").toLowerCase();
    const fn = (firstNameField?.value || "").toLowerCase();
    const ln = (lastNameField?.value || "").toLowerCase();

    let msg = "";
    if (v.length < 8 || v.length > 30) msg = "Password must be 8–30 characters.";
    else if (!/[A-Z]/.test(v)) msg = "Include at least one uppercase letter.";
    else if (!/[a-z]/.test(v)) msg = "Include at least one lowercase letter.";
    else if (!/\d/.test(v)) msg = "Include at least one number.";
    else if (!/[!@#$%^&*()_\-+~<>/.,`\\|[\]{}?:;=]/.test(v) || /"/.test(v))
      msg = "Include a special character (no double quotes).";
    else {
      const low = v.toLowerCase();
      if (uid && (low === uid || low.includes(uid))) msg = "Password cannot equal/contain your user ID.";
      else if (fn && low.includes(fn)) msg = "Password cannot contain your first name.";
      else if (ln && low.includes(ln)) msg = "Password cannot contain your last name.";
    }

    password.setCustomValidity(msg);
  };

  if (password) {
    password.addEventListener("input", passwordPolicyCheck);
    if (userIdField) userIdField.addEventListener("input", passwordPolicyCheck);
    if (firstNameField) firstNameField.addEventListener("input", passwordPolicyCheck);
    if (lastNameField) lastNameField.addEventListener("input", passwordPolicyCheck);
  }

  // ---------------- Salary slider live value ----------------
  const salaryRange = byId("salary");
  const salaryValue = byId("salaryValue");
  if (salaryRange && salaryValue) {
    salaryValue.textContent = `$${Number(salaryRange.value).toLocaleString()}`;
    salaryRange.addEventListener("input", () => {
      salaryValue.textContent = `$${Number(salaryRange.value).toLocaleString()}`;
    });
  }
  // ---------------- Home Budget slider live value ----------------
const homeBudget = byId("homeBudget");
const homeBudgetValue = byId("homeBudgetValue");

if (homeBudget && homeBudgetValue) {
  homeBudgetValue.textContent = `$${Number(homeBudget.value).toLocaleString()}`;
  homeBudget.addEventListener("input", () => {
    homeBudgetValue.textContent = `$${Number(homeBudget.value).toLocaleString()}`;
  });
}


  // ---------------- DOB Auto-format + Validation (MM/DD/YYYY) ----------------
const dobField = byId("dob");
const errDob = byId("err_dob");

if (dobField) {
  const today = new Date();
  // Normalize all comparisons to midnight UTC for safety
  const maxDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const minDate = new Date(Date.UTC(today.getFullYear() - 120, today.getMonth(), today.getDate()));

  // Optional: let HTML date pickers respect this
  dobField.setAttribute("max", maxDate.toISOString().split("T")[0]);
  dobField.setAttribute("min", minDate.toISOString().split("T")[0]);

  const showDobError = (msg) => setError(dobField, errDob, msg);

  const validateDob = () => {
    const v = dobField.value.trim();
    if (!v) {
      showDobError("");
      return;
    }

    // Strict MM/DD/YYYY pattern
    const match = v.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/);
    if (!match) {
      showDobError("Enter date as MM/DD/YYYY (e.g., 12/16/2001).");
      return;
    }

    const mm = parseInt(match[1], 10) - 1;
    const dd = parseInt(match[2], 10);
    const yyyy = parseInt(v.slice(6, 10), 10);

    const entered = new Date(Date.UTC(yyyy, mm, dd)); // compare normalized

    // Invalid calendar dates (like 02/30)
    if (entered.getUTCMonth() !== mm || entered.getUTCDate() !== dd) {
      showDobError("Enter a valid calendar date.");
      return;
    }

    // --- Boundary checks (normalized comparisons) ---
    if (entered.getTime() > maxDate.getTime()) {
      showDobError("Date cannot be in the future.");
    } else if (entered.getTime() < minDate.getTime()) {
      showDobError("Date cannot be more than 120 years ago.");
    } else {
      showDobError("");
    }
  };

  // Auto-format and live validation
  dobField.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 4) v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    else if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
    e.target.value = v;

    validateDob();
  });

  dobField.addEventListener("blur", validateDob);
}


  // ---------------- SSN auto-format (XXX-XX-XXXX) ----------------
  const ssnField = byId("ssn");
  const errSSN = byId("err_ssn");
  if (ssnField) {
    ssnField.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 9);
      if (v.length > 5) v = v.replace(/(\d{3})(\d{2})(\d{0,4})/, "$1-$2-$3");
      else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,2})/, "$1-$2");
      e.target.value = v;

      if (v.replace(/\D/g, "").length !== 9) {
        setError(ssnField, errSSN, "SSN must be 9 digits.");
      } else {
        setError(ssnField, errSSN, "");
      }
    });
  }

  // ---------------- Phone auto-format ((XXX) XXX-XXXX) ----------------
  const phoneField = byId("phone1");
  const errPhone = byId("err_phone");
  if (phoneField) {
    phoneField.addEventListener("input", () => {
      const raw = phoneField.value.replace(/\D/g, "").slice(0, 10);
      const formatted =
        raw.length > 6
          ? `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`
          : raw.length > 3
          ? `(${raw.slice(0, 3)}) ${raw.slice(3)}`
          : raw.length > 0
          ? `(${raw}`
          : "";
      phoneField.value = formatted;

      if (raw.length < 10) {
        setError(phoneField, errPhone, "Please enter a valid 10-digit phone number.");
      } else {
        setError(phoneField, errPhone, "");
      }
    });
  }

  // ---------------- Email validation (name@domain.tld) ----------------
  const emailField = byId("email");
  if (emailField) {
    emailField.addEventListener("input", () => {
      const v = emailField.value.trim();
      const ok = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(v);
      emailField.setCustomValidity(ok || v === "" ? "" : "Enter a valid email address.");
    });
  }

  // ---------------- Address validations ----------------
  const addr1 = byId("address1") || byId("addr1");
  const addr2 = byId("address2") || byId("addr2");
  const city = byId("city");
  const state = byId("state");
  const zip = byId("zip");

  if (addr1) {
    addr1.addEventListener("input", () => {
      const v = addr1.value.trim();
      addr1.setCustomValidity(v.length >= 2 && v.length <= 30 ? "" : "Address Line 1: 2–30 characters.");
    });
  }
  if (addr2) {
    addr2.addEventListener("input", () => {
      const v = addr2.value.trim();
      addr2.setCustomValidity(v.length === 0 || (v.length >= 2 && v.length <= 30) ? "" : "Address Line 2: 2–30 characters.");
    });
  }
  if (city) {
    city.addEventListener("input", () => {
      const v = city.value.trim();
      const ok = /^(?=.{2,30}$)[A-Za-z .'\-]+$/.test(v);
      city.setCustomValidity(ok ? "" : "City: letters, spaces, .' - only (2–30).");
    });
  }
  if (state) {
    state.addEventListener("change", () => {
      state.setCustomValidity(state.value ? "" : "Please select a state.");
    });
  }
  if (zip) {
    zip.addEventListener("input", () => {
      let v = zip.value.replace(/[^\d-]/g, "");
      // allow 12345 or 12345-6789
      if (!/^(\d{0,5}|\d{5}-\d{0,4})$/.test(v)) {
        // sanitize softly
        v = v.replace(/(.*\d{5}).*/, "$1"); // keep up to 5 digits
      }
      zip.value = v;
      const ok = /^\d{5}(-\d{4})?$/.test(v);
      zip.setCustomValidity(ok ? "" : "Enter 5 digits or 9 digits (ZIP+4).");
    });
  }

  // ---------------- User ID ----------------
  if (userIdField) {
    userIdField.addEventListener("blur", () => {
      userIdField.value = (userIdField.value || "").toLowerCase().trim();
    });
    userIdField.addEventListener("input", () => {
      const v = userIdField.value;
      const ok = /^[A-Za-z][A-Za-z0-9_-]{4,29}$/.test(v);
      userIdField.setCustomValidity(ok ? "" : "User ID: 5–30 chars, start with a letter; letters/numbers/_/- only.");
    });
  }

  // ---------------- Names (final) ----------------
  const errFirst = byId("err_firstname");
  const errMid = byId("err_middleinit");
  const errLast = byId("err_lastname");

  // First: letters, apostrophes, dashes (1–30)
  if (firstNameField) {
    firstNameField.addEventListener("input", () => {
      const v = firstNameField.value.trim();
      const ok = /^[A-Za-z'-]{1,30}$/.test(v);
      setError(firstNameField, errFirst, ok ? "" : "Only letters, apostrophes, and dashes allowed (1–30).");
    });
  }

  // Middle: blank or exactly 1 letter
  if (byId("middleinit")) {
    byId("middleinit").addEventListener("input", () => {
      const v = byId("middleinit").value.trim();
      const ok = v === "" || /^[A-Za-z]$/.test(v);
      setError(byId("middleinit"), errMid, ok ? "" : "Only one letter allowed (no numbers or symbols).");
    });
  }

  // Last: letters/apostrophes/dashes with optional 2nd/3rd/4th/5th
  if (lastNameField) {
    lastNameField.addEventListener("input", () => {
      const v = lastNameField.value.trim();
      const okLen = v.length >= 1 && v.length <= 30;
      const pattern = /^[A-Za-z' -]*([2-5](?:nd|rd|th))?[A-Za-z' -]*$/; // only 2–5 suffix allowed
      const ok = okLen && pattern.test(v);
      setError(
        lastNameField,
        errLast,
        ok ? "" : "Use only letters, apostrophes, dashes, and optional suffixes 2nd–5th (e.g., 'Smith 3rd')."
      );
    });
}
});
