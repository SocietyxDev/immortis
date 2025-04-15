document.addEventListener('DOMContentLoaded', () => {
  // Shared functionality across all pages
  if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', logout);
  }
  
  // Page-specific logic
  if (document.body.classList.contains('dashboard-page')) {
    loadDashboard();
  }
});

async function logout() {
  await fetch('/auth/logout', { method: 'POST' });
  window.location.href = '/';
}

async function loadDashboard() {
  const response = await fetch('/api/user');
  const data = await response.json();
  
  if (data.error) {
    window.location.href = '/';
    return;
  }
  
  // Render user data
  document.getElementById('user-profile').innerHTML = `
    <div class="user-card">
      <img src="${data.avatar}" class="avatar">
      <h2>${data.username}#${data.discriminator}</h2>
    </div>
  `;
}
