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

// Form submission handler
document.getElementById('reportForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!checkAuth()) return;
  
  const form = e.target;
  const formData = {
    foodType: form.foodType.value.trim(),
    quantity: form.quantity.value,
    pickupLocation: form.pickupLocation.value.trim(),
    contact: form.contact.value.trim()
  };

  // Validation
  if (!formData.foodType || !formData.quantity || !formData.pickupLocation || !formData.contact) {
    showPopup('Please fill in all required fields.', 'error-message');
    return;
  }

  if (formData.foodType.length < 2) {
    showPopup('Food type must be at least 2 characters long.', 'error-message');
    return;
  }

  if (isNaN(formData.quantity) || Number(formData.quantity) < 1) {
    showPopup('Quantity must be a positive number.', 'error-message');
    return;
  }

  if (formData.pickupLocation.length < 5) {
    showPopup('Pickup location must be at least 5 characters long.', 'error-message');
    return;
  }

  if (!/^[0-9\-\+]{9,15}$/.test(formData.contact)) {
    showPopup('Please enter a valid contact number (9-15 digits, numbers, +, - allowed).', 'error-message');
    return;
  }


  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/api/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      showPopup('Food donation added successfully!');
      form.reset();
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      const errorMsg = data.errors?.[0]?.msg || data.error || 'Failed to add donation.';
      showPopup(errorMsg, 'error-message');
    }
  } catch (err) {
    console.error('Error creating donation:', err);
    showPopup('Network error. Please check if the server is running.', 'error-message');
  }
});

// Initialize page
window.onload = () => {
  if (!checkAuth()) return;
  
  // Add description field if it doesn't exist
  const form = document.getElementById('reportForm');
  if (form && !form.querySelector('#description')) {
    const contactField = form.querySelector('#contact').parentElement;
    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerHTML = `
      <label for="description">Description (Optional)</label>
      <textarea id="description" name="description" placeholder="Additional details about the food donation..." rows="3"></textarea>
    `;
    contactField.parentNode.insertBefore(descriptionDiv, contactField.nextSibling);
  }
}; 