# Food Donation & Wastage Control

A modern web application to help reduce food wastage by allowing users to donate surplus food and for those in need to find and collect it. The platform is secure, visually appealing, and easy to use.

---

## Features
- **User Registration & Login** (JWT authentication with backend)
- **Add Food Donations** (with validation and user association)
- **View All Donations** (dashboard with search functionality)
- **Permanent Dark Mode** (modern, accessible, and visually appealing)
- **Responsive Design** (works on desktop and mobile)
- **Client-side Validation** (robust input checks)
- **Accessible Forms** (labels, ARIA attributes, focus states)
- **Logout & Session Management**
- **Data Persistence** (MongoDB backend)

---

## Tech Stack


### Tech Stack
- **Frontend:** HTML, CSS (custom, dark theme), JavaScript
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Security:** bcryptjs, JWT, helmet, cors, express-validator

---

---


## Deployment

Deploy the backend as a Web Service and the frontend as a Static Site on Render. The backend uses MongoDB Atlas for data persistence.

---


## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended) - for backend
- npm - for backend
- MongoDB Atlas account - for backend
- GitHub account - for deployment

### 1. Clone the Repository
```bash
git clone <repo-url>
cd Food Donation
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Deploy Backend to Render
1. Push your code to GitHub
2. Create a new Web Service on Render, connect your GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from your `.env` file in Render dashboard
6. Deploy and note your backend API URL

### 4. Frontend Setup & Deployment
1. Update `API_BASE` in `frontend/js/config.js` to your Render backend URL
2. Push frontend code to GitHub
3. Create a Static Site on Render, set root directory to `frontend`
4. Deploy

---

---


## Usage

1. Register a new account or login with your credentials
2. Add a food donation with details (type, quantity, location, contact)
3. Browse available donations on the dashboard
4. Search donations by food type, location, or contact
5. Log out securely when done

---

---


## Project Structure
```
├── backend/                 # Backend API (Node.js/Express)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/                # Frontend Application
│   ├── index.html          # Home page
│   ├── login.html          # Login page
│   ├── register.html       # Registration page
│   ├── dashboard.html      # Main dashboard
│   ├── report.html         # Add donation form
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   └── js/
│       ├── config.js       # Application configuration
│       ├── auth.js         # Authentication logic
│       ├── dashboard.js    # Dashboard functionality
│       └── report.js       # Donation form handling
└── README.md
```

---


## Design Highlights
- **Permanent Dark Mode:** Clean, modern, and easy on the eyes
- **Responsive Layout:** Looks great on all devices
- **Modern UI:** Buttons, cards, and forms are styled for clarity and usability
- **Validation:** All forms are validated for security and user experience
- **Accessibility:** Proper labels, focus states, and ARIA attributes
- **Data Persistence:** Database storage (backend)

---


## Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---


## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---


## License
This project is open source and available under the [MIT License](LICENSE).
