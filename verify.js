// =========================================================
// verify.js — Verification Successful page (verify.html)
// =========================================================

// Only people who entered the correct OTP may see this page
Auth.require(Auth.KEYS.otpVerified, APP_CONFIG.pages.signIn);

document.getElementById('logoutBtn').addEventListener('click', (e) => {
  e.preventDefault();
  Auth.logout();
});
