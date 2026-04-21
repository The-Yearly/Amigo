# 🎓 Amigo: Campus Student Service Marketplace

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![MERN](https://img.shields.io/badge/stack-MERN-green)
![License](https://img.shields.io/badge/license-MIT-orange)

**Amigo** is a peer-to-peer digital marketplace designed exclusively for university ecosystems. It allows students to outsource small tasks, offer professional skills, and earn a side income—all within a trusted, verified campus community.

---

## 🚀 Key Features

### For Students
* **Service Listings:** Post gigs like "Quick Printouts," "Coding Help," or "Campus Rides."
* **Smart Discovery:** Search and filter services by category, price, or rating.
* **In-App Messaging:** Secure chat system to coordinate task details.
* **Trust System:** Rating and review mechanism to ensure service quality.
* **Secure Auth:** University-restricted access using JWT and encrypted passwords.

### For Admins
* **User Management:** Monitor activity and manage student accounts.
* **Moderation:** Review reports and remove inappropriate service listings.

---

## 🛠️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (Hooks, Context API) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas) |
| **Auth** | JSON Web Tokens (JWT) & Bcrypt |
| **Styling** | CSS3 / Styled Components |

---

## 🏗️ Architecture

Amigo follows the **MERN (MongoDB, Express, React, Node)** architecture, ensuring a smooth flow of data through RESTful APIs.



---

## 📂 Project Structure

```text
amigo-marketplace/
├── backend/
│   ├── config/         # Database & Auth config
│   ├── controllers/    # Request handling logic
│   ├── models/         # MongoDB Schemas
│   ├── routes/         # API Endpoints
│   └── middleware/     # Auth & Error handlers
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI elements
│   │   ├── pages/      # View components
│   │   └── context/    # Global state management
└── README.md