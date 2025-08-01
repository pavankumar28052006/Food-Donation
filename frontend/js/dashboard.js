// Set your Render backend URL here
const API_BASE = window.API_BASE || 'https://food-donation-0k53.onrender.com/';

// Check authentication
function checkAuth() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const token = localStorage.getItem('token');
  if (!isAuthenticated || !token) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

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

// Display donations
function displayDonations(donations) {
  const container = document.getElementById('lostItems');
  if (!container) return;
  
  if (!donations || donations.length === 0) {
    container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); font-size: 18px; margin: 40px 0;">No food donations available at the moment.</p>';
    return;
  }
  
  container.innerHTML = donations.map(item => `
    <div class="card">
      <h3>${item.foodType}</h3>
      <p><strong>Quantity:</strong> ${item.quantity}</p>
      <p><strong>Location:</strong> ${item.pickupLocation}</p>
      <p><strong>Contact:</strong> ${item.contact}</p>
      <p><strong>Donated by:</strong> ${item.user?.name || 'Unknown'}</p>
      <p><strong>Date:</strong> ${new Date(item.createdAt).toLocaleDateString()}</p>
      <p><strong>Status:</strong> <span style="color: ${item.status === 'available' ? '#4CAF50' : item.status === 'claimed' ? '#FF9800' : '#f44336'}">${item.status}</span></p>
    </div>
  `).join('');
}

// Search functionality
function filterDonations(donations, searchTerm) {
  if (!searchTerm.trim()) {
    displayDonations(donations);
    return;
  }
  
  const filtered = donations.filter(item => 
    item.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contact.includes(searchTerm) ||
    (item.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayDonations(filtered);
}

// Initialize dashboard
window.onload = async () => {
  if (!checkAuth()) return;
  
  let donations = [];
  
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/api/donations`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      donations = data.donations || data; // Handle both paginated and non-paginated responses
    } else {
      console.error('Failed to fetch donations:', res.status);
      showPopup('Failed to load donations.', 'error-message');
    }
  } catch (err) {
    console.error('Error fetching donations:', err);
    showPopup('Network error. Please check if the server is running.', 'error-message');
  }
  
  displayDonations(donations);
  
  // Setup search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterDonations(donations, e.target.value);
    });
  }
  
  // Setup logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.onclick = function() {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      window.location.href = 'login.html';
    };
  }
}; 