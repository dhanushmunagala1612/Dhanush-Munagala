// ====== HW2 JavaScript (external) ======
(function () {
// Banner date
const todayStr = document.getElementById('todayStr');
const now = new Date();
if (todayStr) {
const opts = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
todayStr.textContent = now.toLocaleDateString(undefined, opts);
}


const form = document.getElementById('patientForm');
const review = document.getElementById('reviewSection');
const reviewBtn = document.getElementById('reviewBtn');
const salaryEl = document.getElementById('salary');


// Set DOB min/max dynamically (120 years back to today)
const dob = document.getElementById('dob');
initDateLimits();
function initDateLimits() {
if (!dob) return;
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
dob.max = `${yyyy}-${mm}-${dd}`;
dob.min = `${yyyy - 120}-${mm}-${dd}`;
}


// Live password checks
const pwd1 = document.getElementById('password');
const pwd2 = document.getElementById('password2');
const userId = document.getElementById('userid');


function setMsg(id, text, ok) {
const el = document.getElementById(id);
if (!el) return;
el.textContent = text || '';
el.classList.remove('error', 'pass');
if (text) el.classList.add(ok ? 'pass' : 'error');
}


function validatePasswordMatch() {
if (!pwd1 || !pwd2) return true;
const m1 = pwd1.validity.valid;
const m2 = pwd2.value.length > 0;
let ok = m1 && m2 && pwd1.value === pwd2.value;


// Disallow quotes
if (ok && /"/.test(pwd1.value)) ok = false;


// Password cannot contain userid or name pieces
const uid = (userId?.value || '').toLowerCase();
})();