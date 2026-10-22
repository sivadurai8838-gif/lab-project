// =========================================================
// signin.js — handles the Sign In form (signin.html)
// Original logic kept: username/password check + math captcha.
// New: on success, an OTP is created and we go to otp.html
// =========================================================

// ---- Element references ----
const form = document.getElementById('signInForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const verificationInput = document.getElementById('verification');
const captchaSumEl = document.getElementById('captchaSum');
const togglePasswordBtn = document.getElementById('togglePassword');
const errorMsg = document.getElementById('errorMsg');
const submitBtn = document.querySelector('.btn-submit');

// ---- Math captcha state ----
let captchaA = 0;
let captchaB = 0;

function generateCaptcha() {
  captchaA = Math.floor(Math.random() * 8) + 1; // 1-8
  captchaB = Math.floor(Math.random() * 8) + 1; // 1-8
  captchaSumEl.textContent = `${captchaA} + ${captchaB}`;
}
generateCaptcha();

// ---- PASSWORD SHOW/HIDE TOGGLE ----
togglePasswordBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
  togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});

// ---- Helper: mark a field as invalid + shake the form ----
function showError(message, invalidField) {
  errorMsg.textContent = message;
  form.classList.remove('shake');
  void form.offsetWidth; // restart the animation
  form.classList.add('shake');

  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  if (invalidField) invalidField.classList.add('input-error');
}

function clearError() {
  errorMsg.textContent = '';
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}

// ---- FORM SUBMIT HANDLER ----
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();

  // 1. Username
  if (!usernameInput.value.trim()) {
    showError('Please enter your username.', usernameInput);
    return;
  }

  // 2. Password
  if (!passwordInput.value.trim()) {
    showError('Please enter your password.', passwordInput);
    return;
  }

  // 3. Math verification
  const correctSum = captchaA + captchaB;
  const userAnswer = parseInt(verificationInput.value, 10);

  if (Number.isNaN(userAnswer) || userAnswer !== correctSum) {
    showError('Incorrect verification answer. Please try again.', verificationInput);
    generateCaptcha();
    verificationInput.value = '';
    return;
  }

  // ---- All checks passed: create OTP and go to the OTP page ----
  Auth.set(Auth.KEYS.user, usernameInput.value.trim());
  Auth.createOtp();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending OTP...';

  setTimeout(() => {
    window.location.href = APP_CONFIG.pages.otp;
  }, 900);
});

// ---- Clear inline errors as soon as the user edits a field ----
[usernameInput, passwordInput, verificationInput].forEach((input) => {
  input.addEventListener('input', () => {
    input.classList.remove('input-error');
    if (![usernameInput, passwordInput, verificationInput].some(i => i.classList.contains('input-error'))) {
      errorMsg.textContent = '';
    }
  });
});
