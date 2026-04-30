# EventIQ

EventIQ is an offline-first event planning SaaS for Dehradun. Vendors register, manage profiles, and get matched with event planners across 16 service categories. Auth and data are persisted in browser LocalStorage — no external API calls are required for the app to function.

## Tech Stack

- **Frontend:** React 19 + TypeScript, Vite 5, TailwindCSS 3, TanStack Router, Radix UI, Three.js / @react-three/fiber, Framer Motion
- **Backend (template):** Motoko on the Internet Computer (Caffeine framework). The backend canister is currently empty (`actor {}`) and is not required for the app to run — the UI uses LocalStorage.
- **Package Manager:** pnpm (workspace at `pnpm-workspace.yaml`)
- **Build Tool:** Vite

## Project Layout

```
.
├── src/
│   ├── frontend/        # React + Vite app (this is what runs)
│   │   ├── src/
│   │   │   ├── pages/   # Home, Login, Signup, Dashboard, Planning, etc.
│   │   │   ├── components/
│   │   │   ├── context/ # AuthContext (LocalStorage-based)
│   │   │   ├── data/    # vendorDatabase.ts
│   │   │   └── ...
│   │   ├── vite.config.js
│   │   └── package.json
│   └── backend/         # Motoko canister (empty template)
└── frontend/public/     # Static image assets
```

## Replit Environment Setup

- **Node.js:** 20 (installed as a Replit module)
- **pnpm:** installed globally to `~/.npm-global` (Nix store is read-only, so corepack symlinks fail). The dev workflow prepends `~/.npm-global/bin` to PATH before running pnpm.
- **Workflow:** `Start application` runs `pnpm dev` from `src/frontend/` and binds Vite to `0.0.0.0:5000` with `allowedHosts: true` so the Replit iframe proxy can reach it.

## Deployment

Configured as a **static** deployment:

- **Build:** `cd src/frontend && pnpm install --prefer-offline && pnpm build`
- **Public dir:** `src/frontend/dist`

## Notes

- The Motoko backend is intentionally not deployed in this Replit environment (it would require dfx). The console warning `CANISTER_ID_BACKEND is not set` is expected and does not break the app — all features use LocalStorage.
- HMR works through the Replit proxy with default Vite settings (no custom `clientPort` required).
