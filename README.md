# IP Geolocation & History API

A robust Node.js backend built for a Flutter frontend. This API handles user authentication and tracks IP search history. It is designed to run seamlessly on a local machine using **SQLite** or in the cloud (Vercel) using **PostgreSQL/Supabase**.

## 📂 Folder Structure
```text      
├── api/
│   └── index.js           # Express entry point & Vercel handler
├── src/
│   ├── db/
│   │   └── database.js    # Universal DB wrapper (Switches between SQLite/Postgres)
│   ├── middleware/
│   │   └── auth.js        # JWT Verification middleware
│   ├── routes/
│   │   ├── auth.js        # Login and Authentication logic
│   │   └── history.js     # IP History CRUD operations
│   ├── seed/
│       └── seedUsers.js   # Database seeder for test users
├── .env.example           # Environment variables example (actual .env optional for local)
├── data.db                # SQLite database (Auto-generated locally)
├── vercel.json            # Vercel deployment configuration
├── package-lock.json
└── package.json           # Dependencies and scripts

```

## 🚀 Getting Started

### 1. Prerequisites

* Node.js (v18 or higher recommended)
* npm

### 2. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 3. Database Setup

This app is built with an **Environment-based Configuration**:

* **Local Testing:** No setup required. The app will automatically create a `data.db` file using SQLite.
* **Production:** To use a cloud database, add a `DATABASE_URL` to your `.env` file (see Environment Variables section).

### 4. Seed the Database

Run the seeder to create a test user for the Flutter app:

```bash
npm run seed
```

**Default Credentials:**

* **Email:** `test@example.com`
* **Password:** `password123`

### 5. Start the Server Locally

```bash
npm run dev
```

The server will run at `http://localhost:8000`.

---

## 🛠 Environment Variables

You can create a `.env` file in the root directory. **None of these are strictly required for local testing** as the app uses safe fallbacks.

| Variable | Description | Local Fallback |
| --- | --- | --- |
| `DATABASE_URL` | Postgres connection string (Supabase) | `data.db` (SQLite) |
| `JWT_SECRET` | Secret key for signing tokens | `inside routes/auth.js` |
| `PORT` | Server port | `8000` |

---

## 🛣 API Routes

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/login` | Authenticates user and returns a JWT. |
| `POST` | `/api/signup` | Creates a new user. |
| `GET` | `/api/lookup` | Looks up geo info from ipinfo.io. |

### IP Lookup

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/lookup` | Looks up geo info from ipinfo.io. |

### History

*All history routes require an `Authorization: Bearer <token>` header.*

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/history` | Returns all search history for the logged-in user. |
| `POST` | `/api/history` | Saves a new IP search result. |
| `DELETE` | `/api/history` | Deletes selected items (Expects an array of `ids` in body). |

---
