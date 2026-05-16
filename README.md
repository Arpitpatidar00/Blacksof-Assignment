# DeJoule — Monorepo Architecture

A production-grade, high-performance monorepo featuring a Next.js 15 frontend with App Router, an Express API, and shared logic packages.

## 🏗 System Architecture

This project follows a strict **Yarn Monorepo** pattern for code sharing and scalability.

```text
.
├── apps/
│   ├── web/          # Next.js 15 App Router (Frontend)
│   └── server/       # Express + Mongoose (API)
├── libs/
│   ├── types/        # Shared Domain & API TypeScript interfaces
│   ├── utils/        # Shared logic & formatting helpers
│   └── services/     # Shared API Client & Business Logic
├── .agent/           # Code quality & Architecture enforcement rules
├── package.json      # Workspace root
└── yarn.lock         # Unified dependency lock
```

### Frontend Architecture (apps/web)

The frontend implements a **3-tier component architecture** and a **Module-based structure**:

- **App Layer (`/app`)**: Pure entry points, zero business logic.
- **Modules (`/modules`)**: Section-specific compositions (Hero, Features, etc.).
- **Components (`/components`)**:
  - `base/`: Primitives (Button, Input).
  - `composites/`: Reusable patterns (FormField).
- **SSR & Hydration**: Powered by **TanStack Query**, prefetching critical data on the server for instant page loads.

### Backend Architecture (apps/server)

The backend follows a **Controller-Service-Model** pattern:

- **Middleware**: Global error handling, asset cleanup (Cloudinary), and Zod/Express-Validator validation.
- **Transactional Integrity**: Automatic cleanup of orphaned Cloudinary assets on request failure.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Framer Motion, TanStack Query, Sonner (Toasts), Lucide Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Nodemailer, Multer (Cloudinary storage).
- **Infrastructure**: TypeScript (Strict Mode), Yarn Workspaces, ESLint.

## 🛠 Getting Started

### Prerequisites

- Node.js >= 20.x
- Yarn 1.x

### Installation

1. Clone the repository and install dependencies:
   ```bash
   yarn install
   ```
2. Set up environment variables:
   - Create `.env` in `apps/server` (use `.env.example` as a template).
   - Create `.env.local` in `apps/web`.

### Development

Start the full stack with one command:

```bash
yarn dev
```

- **Web**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:8000/api](http://localhost:8000/api)

### Build

Create production-ready bundles for the entire stack:

```bash
yarn build
```

Individual builds:

- `yarn build:web`: Build the Next.js application
- `yarn build:server`: Build the Express server (compiles TS to JS)

## ⚖️ Code Quality & Standards

This project enforces professional standards via the `.agent` config:

- **Zero Magic Values**: All strings/numbers must be in `/constants`.
- **Type Safety**: `strict: true` in tsconfig; `any` types are prohibited.
- **Barrel Exports**: Mandatory `index.ts` in every folder for clean imports.

## 📦 Deployment

- **Frontend**: Vercel (Optimized for `standalone` output).
- **Backend**: Render (Configured via `render.yaml`).

---

Built with excellence by the Blacksof Team.
