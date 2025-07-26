# 💸 Aarthik – Track your Finances

Aarthik is a full-stack web application that allows users to track their personal income and expenses, monitor spending habits, and visualize financial data in real-time. It’s secure, responsive, and built for everyday financial awareness.

Live at: [🌐 https://aarthik.online](https://aarthik.online)

---

## 🚀 Features

- ✅ **User Authentication** (JWT based)
- 💰 **Add, Edit, Delete Transactions**
- 📊 **Real-Time Financial Dashboard**
- 📈 **Income & Expense Insights**
- 📅 **Transaction History**
- 📱 **Fully Responsive Design**
- 🔒 **Change Password** functionality
- 📁 **Deployed with custom domain + env config**

---

## 🛠️ Tech Stack

### Frontend
- **React + Vite**
- **Redux** for state management
- **Axios** for API requests
- **React Router DOM** for routing
- **Lucide Icons** for UI icons
- **Tailwind CSS** (assumed from design)
- **Vercel** for deployment

### Backend
- **Node.js + Express**
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Railway** for deployment

---

## Getting Started Locally

### Clone the repo

- git clone **[github](https://github.com/imankurbhowmik/aarthik)**

### Setup Backend

- cd server
- npm install
- npm run dev

### Setup Frontend

- cd client
- npm install
- npm run dev

---

## Security

- JWT tokens stored in localStorage
- Logout clears token + resets Redux state
- No sensitive keys exposed on frontend
- Backend protected with environment variables

---

## Deployment

- Hosted with custom domain: https://aarthik.online

---

## Future Scopes

- Add Google Sign-In / OAuth
- Connect to bank account
- Export transactions as CSV
- Auto add transactions
- Monthly report generation

---

## Author

**Ankur Bhowmik**
**[LinkedIn](https://www.linkedin.com/in/ankur-bhowmik-83921b18b)**



