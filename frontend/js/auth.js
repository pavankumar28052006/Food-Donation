// Set your Render backend URL here
const API_BASE = window.API_BASE || 'https://food-donation-0k53.onrender.com';

// Show popup notification function
function showPopup(message, type = 'success') {
  const popup = document.createElement('div');
  popup.textContent = message;
  popup.style.position = 'fixed';
  popup.style.backgroundColor = type === 'error-message' ? '#ff4444' : '#4CAF50';
  popup.style.color = 'white';
  popup.style.padding = '12px 20px';
  popup.style.borderRadius = '4px';
  popup.style.top = '32px';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.zIndex = '9999';
  popup.style.minWidth = '240px';
  popup.style.textAlign = 'center';
  popup.style.fontWeight = 'bold';
  document.body.appendChild(popup);
  setTimeout(() => { popup.remove(); }, 3000);
}

// Register form handler
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  // Basic validation
  if (!name || !email || !password) {
    showPopup('Please fill in all fields.', 'error-message');
    return;
  }

  if (password.length < 6) {
    showPopup('Password must be at least 6 characters long.', 'error-message');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await res.json();
    
    if (res.ok) {
      showPopup('Registration successful! Please login with your credentials.');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } else {
      const errorMsg = data.errors?.[0]?.msg || data.error || 'Registration failed';
      showPopup(errorMsg, 'error-message');
    }
  } catch (err) {
    console.error('Registration error:', err);
    showPopup('Network error. Please check if the server is running.', 'error-message');
  }
});

// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  // Basic validation
  if (!email || !password) {
    showPopup('Please fill in all fields.', 'error-message');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      showPopup('Login successful!');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    } else {
      const errorMsg = data.errors?.[0]?.msg || data.error || 'Login failed';
      showPopup(errorMsg, 'error-message');
    }
  } catch (err) {
    console.error('Login error:', err);
    showPopup('Network error. Please check if the server is running.', 'error-message');
  }
}); 
