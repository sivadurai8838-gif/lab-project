// =========================================================
// otp.js — handles the OTP page (otp.html)
// Without an email server we show the OTP in a yellow DEMO box.
// =========================================================

// Only people who passed Sign In may be here
Auth.require(Auth.KEYS.otp, APP_CONFIG.pages.signIn);

const form = document.getElementById('otpForm');
const btn = document.getElementById('verify-btn');
const otpField = document.getElementById('otpField');
const otpError = document.getElementById('otpError');
const demoOtp = document.getElementById('demoOtp');
const timerSec = document.getElementById('timer-sec');
const resendTimer = document.getElementById('resend-timer');
const resendLink = document.getElementById('resend-link');

// Show the OTP (demo only)
demoOtp.textContent = Auth.get(Auth.KEYS.otp);

// ---- Resend countdown ----
let timeLeft = APP_CONFIG.resendSeconds;
let countdown = null;

function startCountdown() {
  clearInterval(countdown);
  timeLeft = APP_CONFIG.resendSeconds;
  timerSec.innerText = timeLeft;
  resendTimer.style.display = 'inline';
  resendLink.style.display = 'none';

  countdown = setInterval(() => {
    timeLeft--;
    timerSec.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      resendTimer.style.display = 'none';
      resendLink.style.display = 'inline';
    }
  }, 1000);
}
startCountdown();

// ---- Resend OTP ----
resendLink.addEventListener('click', () => {
  demoOtp.textContent = Auth.createOtp();
  otpError.textContent = 'A new OTP has been generated.';
  otpError.style.color = 'var(--success)';
  otpField.value = '';
  startCountdown();
});

// ---- Verify OTP ----
form.addEventListener('submit', (e) => {
  e.preventDefault();
  otpError.style.color = 'var(--error)';

  const entered = otpField.value.trim();
  const expiry = Number(Auth.get(Auth.KEYS.otpExpiry));

  if (Date.now() > expiry) {
    otpError.textContent = 'OTP expired. Please click Resend OTP.';
    return;
  }

  if (entered !== Auth.get(Auth.KEYS.otp)) {
    otpError.textContent = 'Incorrect OTP. Please try again.';
    otpField.value = '';
    otpField.focus();
    return;
  }

  // Success
  Auth.set(Auth.KEYS.otpVerified, '1');
  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Verifying...';
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = APP_CONFIG.pages.verify;
  }, 700);
});
