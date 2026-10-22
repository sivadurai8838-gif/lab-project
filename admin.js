// =========================================================
// admin.js — Admin Access popup (admin.html)
// =========================================================

// Only people who passed OTP verification may see this page
Auth.require(Auth.KEYS.otpVerified, APP_CONFIG.pages.signIn);

const passwordInput = document.getElementById('adminPassword');
const message = document.getElementById('message');

function checkPassword() {
  const password = passwordInput.value;

  if (password === APP_CONFIG.adminPassword) {
    message.style.display = 'block';
    message.style.color = '#28a745';
    message.innerHTML = '✓ Access Granted';

    Auth.set(Auth.KEYS.admin, '1');

    // Redirect after 1.5 seconds
    setTimeout(() => {
      window.location.href = APP_CONFIG.pages.dashboard;
    }, 1500);
  } else {
    message.style.display = 'block';
    message.style.color = '#dc3545';
    message.innerHTML = '✗ Incorrect Password';
  }
}

// Cancel: clear the box, sign out, and go back to Home
function cancelAccess() {
  passwordInput.value = '';
  message.style.display = 'none';
  Auth.logout();
}

document.getElementById('okBtn').addEventListener('click', checkPassword);
document.getElementById('cancelBtn').addEventListener('click', cancelAccess);

// Pressing Enter also submits
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPassword();
});
