const ADMIN_EMAIL = "admin1@gmail.com";
const ADMIN_PASSWORD = "12345678";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const authError = document.getElementById("authError");

const AUTH_KEY = "vp_admin_auth";

if (localStorage.getItem(AUTH_KEY) === "true") {
  window.location.replace("index.html");
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  authError.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true");
    window.location.replace("index.html");
    return;
  }

  authError.textContent = "Invalid admin credentials.";
});
