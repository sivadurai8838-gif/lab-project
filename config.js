// =========================================================
// config.js  —  settings shared by ALL pages
// Change values here and every page picks them up.
// =========================================================
const APP_CONFIG = {
  companyName: "Jayalakshmi Clinic Laboratory", // (was company.json -> cname in the PHP page)
  poweredBy: "Qvesys Info-Tech",
  adminPassword: "admin123",   // DEMO ONLY - real systems check this on a server
  otpValidMinutes: 5,
  resendSeconds: 60,
  pages: {
    home: "index.html",
    signIn: "signin.html",
    otp: "otp.html",
    verify: "verify.html",
    admin: "admin.html",
    dashboard: "dashboard.html"
  }
};
