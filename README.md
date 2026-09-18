# Kishan Sathi — AI Agriculture Platform

A modern full-stack digital agriculture companion connecting farmers, modern tech, experts, mandis, and institutional buyers.

```
Kishan_Sathi-main/
│
├── frontend/             # React 19 + Vite 6 + Tailwind CSS Application
│   ├── src/              # Components, pages, features, contexts, services
│   ├── public/           # Static assets, 3D illustrations, icons
│   ├── package.json      # Frontend dependencies & scripts
│   ├── vite.config.js    # Vite configuration & /api proxy
│   ├── tailwind.config.js# Design system & dark mode tokens
│   ├── postcss.config.js # PostCSS config
│   ├── eslint.config.js  # Linter configuration
│   └── index.html        # SPA entry HTML
│
├── backend/              # Node.js + Express + MongoDB Service
│   ├── src/              # Models, controllers, routes, middleware, config
│   ├── package.json      # Backend dependencies & scripts
│   ├── .env.example      # Environment variables template
│   └── .env              # Local environment variables
│
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

---

## Getting Started

### 1. Frontend Setup (React + Vite)

The frontend application runs on **Vite** on port `5173`.

```bash
cd frontend
npm install
npm run dev
```

Open your browser at:
`http://localhost:5173`

To build the production bundle:
```bash
cd frontend
npm run build
```

---

### 2. Backend Setup (Node.js + Express)

The backend service runs on port `5000` with API prefix `/api`.

```bash
cd backend
npm install
npm run dev
```

The backend health check is accessible at:
`http://localhost:5000/api/health`

---

## Role Separation & Architecture

### Farmer Portal Flow
- **Landing**: Choose "Farmer" or navigate to `/login/farmer`
- **Farmer Login**: Dedicated farmer portal login with phone & password
- **Demo Credentials**:
  - Phone: `9876543210`
  - Password: `Sathi@123`
- **Dashboard**: Strictly opens `/dashboard` (The existing Farmer Dashboard)

### Company / Institutional Buyer Flow
- **Landing**: Choose "Company / Buyer" or navigate to `/login/company`
- **Company Login**: Dedicated procurement portal login with business email & password
- **Demo Credentials**:
  - Email: `company@kishansathi.demo`
  - Password: `company123`
- **Dashboard**: Strictly opens `/company/dashboard` (Independent Company Portal)

> **Important**: The Company portal never accesses `/dashboard`, and the Farmer portal never accesses `/company/*`.

---

## Key Features Preserved
- **Complete Public Landing Page**: With 3D illustrated solution cards, How It Works flow, and real sunrise farmer portrait.
- **Farmer Dashboard**: Locked and 100% preserved.
- **Global Language System**: Multi-language support (English & Hindi) stored in `kishanSathiLanguage`.
- **Dark Mode**: Seamless toggle between light and dark themes.
- **Offline / Hybrid Readiness**: Full service abstraction layer with mock data fallbacks.
