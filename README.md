# Fleura — Fullstack Flower Delivery App 🌸

**Repo:** `fullstack-auth-app`  
**Author:** Shlok Anand  
**Course / Submission:** FLEXI — *Introduction to Full Stack Development* (project)

---

## Project overview

Fleura is a small full-stack application for a local flower business.  
It demonstrates the core concepts from the course:

- React frontend (Vite)
- Node/Express backend
- Simple file-based persistence (JSON files) for demo purposes
- Authentication (register/login) (mocked with plaintext passwords for the assignment)
- Cart, checkout and admin views (orders & messages)
- Clean folder structure suitable for submission

---

## Folder structure (submission format)
fullstack-auth-app/
├── backend/
│ ├── package.json
│ ├── server.js
│ ├── .env # not committed
│ ├── config/ # optional (db.js for real DBs)
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── messages.js
│ │ └── orders.js
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── messageController.js
│ │ └── orderController.js
│ ├── middleware/
│ └── utils/
│ └── store.js
│ └── data/
│ ├── users.json
│ ├── messages.json
│ └── orders.json
│
├── frontend/
│ ├── package.json
│ ├── vite.config.js
│ ├── public/
│ │ └── index.html
│ └── src/
│ ├── main.jsx
│ ├── App.jsx
│ ├── components/
│ │ └── Nav.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Cart.jsx
│ │ ├── Checkout.jsx
│ │ ├── Contact.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── Admin.jsx
│ ├── context/
│ │ ├── AuthContext.jsx
│ │ └── CartContext.jsx
│ └── services/
│ └── api.js
│
├── README.md
└── .gitignore


---

## 🚀 Quick Setup (Run Locally)

> ⚙️ Make sure **Node.js** is installed (recommended: Node 18+ or Node 20+).

### 🪴 1️⃣ Clone the Repository
```bash
git clone https://github.com/ShlokAnand/FLEXI.git
cd FLEXI
# or: cd fullstack-auth-app (if you renamed locally)
🌸 2️⃣ Backend Setup
bash

cd backend
npm install
Now create a .env file manually inside the backend folder.
You can copy this example:

ini

PORT=5000
ADMIN_TOKEN=admintoken123
Then start the backend server:

bash

npm run dev   # if nodemon is installed
# OR
npm start
# OR
node server.js
If successful, you’ll see:

arduino

Server running on port 5000
💐 3️⃣ Frontend Setup
Open a new terminal in your project root and run:

bash

cd frontend
npm install
npm run dev
If successful, Vite will show:

arduino

Local:   http://localhost:5173/
🌍 4️⃣ Open in Browser
Visit this URL in your browser:

arduino

http://localhost:5173
Your Fleura Flower Delivery App will now be live locally 🌸
