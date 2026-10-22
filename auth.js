// =========================================================
// auth.js  —  tiny helper shared by all pages
// Remembers how far the user has got (sessionStorage), so
// nobody can jump straight to a later page by typing its name.
// =========================================================
const Auth = {
  KEYS: {
    user: "qv_user",
    otp: "qv_otp",
    otpExpiry: "qv_otp_expiry",
    otpVerified: "qv_otp_verified",
    admin: "qv_admin"
  },

  set(key, value) { sessionStorage.setItem(key, value); },
  get(key) { return sessionStorage.getItem(key); },

  // If the needed step is missing, send the user back to a safe page
  require(key, redirectTo) {
    if (!sessionStorage.getItem(key)) {
      window.location.replace(redirectTo);
    }
  },

  // Make a new 6-digit OTP that is valid for a few minutes
  createOtp() {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    this.set(this.KEYS.otp, otp);
    this.set(this.KEYS.otpExpiry, String(Date.now() + APP_CONFIG.otpValidMinutes * 60 * 1000));
    return otp;
  },

  // Clear everything and go back to the Home page
  logout() {
    sessionStorage.clear();
    window.location.href = APP_CONFIG.pages.home;
  }
};
