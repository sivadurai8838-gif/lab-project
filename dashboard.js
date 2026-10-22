// =========================================================
// dashboard.js — page shown after Admin access (dashboard.html)
// =========================================================

// Only people who unlocked the Admin page may see this page
Auth.require(Auth.KEYS.admin, APP_CONFIG.pages.admin);

document.getElementById('userName').textContent = Auth.get(Auth.KEYS.user) || 'Admin';
document.getElementById('logoutBtn').addEventListener('click', Auth.logout);
