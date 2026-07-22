# Amigo — Skills. Services. Students.

Amigo is a campus-restricted, web-based student service marketplace built on the MERN stack. It lets university students offer and request small peer-to-peer services — printouts, errands, academic help, design/coding help, homemade food, and quick rides — within a trusted, verified campus community.

## Table of Contents

- [Problem & Objective](#problem--objective)
- [Solution Overview](#solution-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Non-Functional Requirements](#non-functional-requirements)
- [Limitations](#limitations)
- [Future Scope](#future-scope)
- [Team](#team)

## Problem & Objective

Students lack a trusted, campus-specific platform to exchange skills and services. Generic gig platforms (Fiverr, OLX) aren't built for university communities and lack the trust, proximity, and peer verification that intra-campus transactions need.

**Objectives:**
- Enable students to post, browse, and request peer services on campus
- Provide secure, JWT-based authentication restricted to verified university accounts
- Support real-time messaging, service tracking, ratings, and moderation

## Solution Overview

Amigo lets students act as both service providers and requesters. It connects peers offering services with those who need them, without any generic-platform noise.

**Key differentiator:** university-exclusive access, verified accounts, local trust, and a full peer-to-peer service lifecycle — from posting to payment-free completion.

**High-level flow:**

```
Register (verified email) → Post/Browse Services → Request → Accept → Message → Complete → Review
```

## Features

- **Student Registration** — name, email, department, year, with bcrypt-hashed passwords and JWT issuance
- **Authentication** — JWT login with protected API routes and session management
- **Profile Management** — update profile details, upload a profile picture, add skills/interests, view ratings and completed services
- **Service Listings** — create listings with title, category, price, location, and ETA, plus keyword/category search
- **Service Requests** — request flow with status tracking (`Pending → Accepted → In Progress → Completed`)
- **Messaging** — real-time text messaging with conversation history between requester and provider
- **Ratings & Reviews** — post-completion ratings and reviews
- **Reporting & Moderation** — reporting system for admin review
- **Admin Dashboard** — view all users, remove flagged listings, escalate reports, and handle misconduct

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (UI rendering, form validation, API communication, state management), Tailwind CSS, Vite |
| Backend | Node.js + Express.js (REST API, business logic, auth middleware) |
| Database | MongoDB (Atlas/Local) — users, services, requests, messages, reviews, reports |
| Auth | JWT (JSON Web Tokens) + bcrypt password hashing |
| Protocol | HTTP/HTTPS, RESTful API, JSON |
| Hosting | Linux-based / cloud environment |

## System Architecture

Amigo follows a three-tier MERN architecture:

```
Client Layer        Application Layer                Data Layer
React.js         →  Express REST API              →  MongoDB
Web Browser          JWT Middleware
User Interface       Business Logic Controllers
```

**Major modules:** User Management · Service Listings · Service Requests · Messaging System · Reviews & Ratings · Report Moderation

**Core entities:** `USERS`, `SERVICES`, `SERVICE_REQUESTS`, `MESSAGES`, `REVIEWS`, `REPORTS` — linked via relationships across MongoDB collections.

**Service request lifecycle:** `Pending → Accepted → In Progress → Completed`, with each status change triggering a backend `PATCH` call and a frontend state refresh.

## Project Structure

```
Amigo/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   │   └── cors.js
│   │   ├── controllers/
│   │   │   ├── adminManager.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── dashboard.controller.js
│   │   │   ├── flag.controller.js
│   │   │   ├── message.controller.js
│   │   │   ├── request.controller.js
│   │   │   ├── service.controller.js
│   │   │   └── user.controller.js
│   │   ├── lib/
│   │   │   ├── prisma.js
│   │   │   └── sendMail.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── routes/
│   │   │   ├── adminManager.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   ├── flag.routes.js
│   │   │   ├── message.routes.js
│   │   │   ├── request.routes.js
│   │   │   ├── service.routes.js
│   │   │   └── user.routes.js
│   │   ├── seed/
│   │   │   └── seed.js
│   │   ├── utils/
│   │   │   └── asyncHandler.js
│   │   └── index.js
│   ├── .env.sample
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   └── serviceImage1.jpeg
│   │   └── holiday-wishes-font/
│   │       ├── misc/
│   │       │   └── README PLEASE!!_PE....
│   │       ├── HolidayWishes-51mwa.otf
│   │       ├── HolidayWishes-6YZ7x.ttf
│   │       └── info.txt
│   ├── TextToSvgComponent.jsx
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Auth/
│   │   │   │   └── AuthInput.jsx
│   │   │   ├── Chat/
│   │   │   │   └── MessageInput.jsx
│   │   │   ├── Landing/
│   │   │   │   ├── AmigoLanding.jsx
│   │   │   │   ├── DashBoard.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── ServiceCard.jsx
│   │   │   │   └── ThemeToggle.jsx
│   │   │   ├── Profile/
│   │   │   │   └── ProfilePage.jsx
│   │   │   └── Services/
│   │   │       ├── ActiveRequestItem.jsx
│   │   │       ├── BookingCard.jsx
│   │   │       ├── ExpertiseForm.jsx
│   │   │       ├── FormField.jsx
│   │   │       ├── HistoryRow.jsx
│   │   │       ├── ImageUpload.jsx
│   │   │       ├── IncomingRequestsFooter.jsx
│   │   │       ├── IncomingRequestsNavBar.jsx
│   │   │       ├── ListingTipsPanel.jsx
│   │   │       ├── MyServiceCard.jsx
│   │   │       ├── RequestDetailPanel.jsx
│   │   │       ├── RequestListItem.jsx
│   │   │       ├── RequestNavBar.jsx
│   │   │       ├── RequestTabBar.jsx
│   │   │       ├── RequirementCard.jsx
│   │   │       ├── ReviewCard.jsx
│   │   │       ├── ServicePreviewCard.jsx
│   │   │       ├── StatCard.jsx
│   │   │       ├── StatTile.jsx
│   │   │       ├── StatusBadge.jsx
│   │   │       └── WorkspaceSidebar.jsx
│   │   ├── admin/
│   │   │   ├── auditlog/
│   │   │   │   └── page.jsx
│   │   │   ├── components/
│   │   │   │   ├── AdminsideBar.jsx
│   │   │   │   ├── AdmintopBar.jsx
│   │   │   │   ├── adminProfile.jsx
│   │   │   │   ├── adminReviewBox.jsx
│   │   │   │   ├── adminRow.jsx
│   │   │   │   └── confirmModel.jsx
│   │   │   ├── flagged/
│   │   │   │   ├── flaggedCard.jsx
│   │   │   │   ├── page.jsx
│   │   │   │   ├── reviewFlaggedErrand.jsx
│   │   │   │   └── reviewFlaggedUser.jsx
│   │   │   ├── manageAdmins/
│   │   │   │   └── page.jsx
│   │   │   ├── layout.jsx
│   │   │   ├── mobileContext.js
│   │   │   └── page.jsx
│   │   ├── auth/
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   ├── SignInPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   └── page.jsx
│   │   ├── components/
│   │   │   ├── BottomNavBar.jsx
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── ConversationItem.jsx
│   │   │   ├── ExploreFooter.jsx
│   │   │   ├── ExploreNavBar.jsx
│   │   │   ├── FeatureBadge.jsx
│   │   │   ├── FilterChip.jsx
│   │   │   ├── MessagesTopAppBar.jsx
│   │   │   ├── MobileNavPill.jsx
│   │   │   ├── NavItem.jsx
│   │   │   ├── NavLink.jsx
│   │   │   ├── SearchFilterBar.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── ServiceCardWide.jsx
│   │   │   ├── StarRating.jsx
│   │   │   └── TopAppBar.jsx
│   │   ├── dashboard/
│   │   │   └── DashboardPage.jsx
│   │   ├── lib/
│   │   │   ├── authProvider.js
│   │   │   └── protectedRoutes.js
│   │   ├── messaging/
│   │   │   └── MessagesPage.jsx
│   │   ├── services/
│   │   │   ├── Confirmation.jsx
│   │   │   ├── CreateServicePage.jsx
│   │   │   ├── CreatorProfile.jsx
│   │   │   ├── EditServicePage.jsx
│   │   │   ├── ExplorePage.jsx
│   │   │   ├── IncomingRequestsPage.jsx
│   │   │   ├── MyRequestsPage.jsx
│   │   │   ├── MyServicesPage.jsx
│   │   │   ├── ServicePage.jsx
│   │   │   └── editLayout.jsx
│   │   ├── App.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ServiceLayout.jsx
│   │   ├── index.css
│   │   ├── layout.jsx
│   │   └── main.jsx
│   ├── temp/
│   │   └── forgotpassword-comp.../
│   │       └── ForgotPasswordPage.jsx
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .gitignore
│   └── sample.env
├── .gitignore
└── sample.env
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local instance or Atlas cluster)

### Backend Setup

```bash
cd backend
npm install
cp .env.sample .env   # fill in your environment variables
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp sample.env .env    # fill in your environment variables
npm run dev
```

## Environment Variables(Backend)

Copy `sample.env` in each package and configure values such as:

```
DATABASE_URL=""
JWT_SECRET="""
EMAILID=""
EMAILPASS=""
PORT=5000
```
## Environment Variables(Frontend)
Copy `sample.env` in each package and configure values such as:
```
VITE_BACKEND_URL=""
FRONTEND_URL=""
```


> Check `backend/.env.sample` and root `sample.env` for the exact variables required by your setup.

## Non-Functional Requirements

- **Performance** — target response time under 2–3 seconds, with MongoDB indexing for optimized queries
- **Security** — bcrypt hashing, JWT authentication, protected routes, input validation against injection attacks
- **Reliability** — graceful error handling, data consistency, server-side error logging
- **Usability** — simple, intuitive interface accessible to non-technical users, with tasks completable in minimal steps

**Advantage over Fiverr/OLX:** campus-restricted trust, student-verified accounts, local proximity, and no payment gateway required.

## Limitations

- No payment integration
- No mobile app
- Scoped to campus web only

## Future Scope

- Real-time messaging with WebSockets (Socket.io) for instant notifications and chat
- In-app payment integration (UPI / Razorpay) for secure service transactions
- Mobile application (React Native) for on-the-go access
- AI-powered service recommendations based on student profile and history
- Multi-campus expansion with institution-level admin controls and verified email domains

## Team

Built for **23AIE457 Full Stack Development**, Amrita School of Computing

| Name|
|---|
| [Swayam Agrahari](https://github.com/swayam-agrahari) |
| [John Yohan Skaria](https://github.com/The-Yearly) |
| [Yadhu Vipin](https://github.com/yadhu-vipin)|
| Ajith Ashok |
