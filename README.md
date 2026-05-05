# Fity React

Frontend for the Fity Downloader — a video download client built with React + Vite.

## Tech Stack

- **React 18** + **Vite 5** + **TypeScript 5**
- **Redux Toolkit** (RTK Query for API state)
- **React Router v6**
- **Tailwind CSS v3**

## Production

| | |
|---|---|
| **Platform** | [Vercel](https://vercel.com) |
| **URL** | https://your-app.vercel.app |
| **Backend** | https://fity-node-sparkling-firefly-5762.fly.dev |

### First-time deployment steps

These are the exact commands used to deploy the app for the first time:

```bash
npm install -g vercel         # install Vercel CLI
npx vercel                    # create project, deploy preview
npx vercel env add VITE_API_URL production
# paste: https://fity-node-sparkling-firefly-5762.fly.dev
npx vercel --prod             # deploy to production with env variable applied
```

### Redeploy

```bash
npx vercel --prod
```

---

## Prerequisites (local development)

- Node.js `22.19.0` (use `nvm use` to switch automatically)
- [fity-node](../fity-node) backend running on `http://localhost:3000`

## Getting Started

```bash
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `` (empty) | Base URL of the Express backend. Empty in dev — Vite proxies `/api` to `localhost:3000` automatically. Set to the Fly.io URL in production. |

On Vercel, environment variables are managed via:
```bash
npx vercel env add VITE_API_URL production
```

## Available Scripts

```bash
npm run dev        # Start development server with HMR
npm run build      # tsc + Vite production build → dist/
npm run preview    # Preview the production build locally
npm run typecheck  # tsc --noEmit — type check without building
```

## Project Structure

```
src/
├── main.tsx              # Entry point — Redux Provider + BrowserRouter
├── App.tsx               # Route definitions
├── index.css             # Tailwind directives
├── vite-env.d.ts         # Vite env type declarations
├── types/
│   └── video.ts          # Shared types — VideoInfo, VideoFormat
├── store/
│   ├── index.ts          # Redux store + RootState/AppDispatch exports
│   ├── hooks.ts          # Typed useAppDispatch / useAppSelector hooks
│   └── videoApi.ts       # RTK Query API slice + buildStreamUrl helper
├── pages/
│   └── Home.tsx          # Main page (form + results)
├── components/
│   ├── UrlForm.tsx        # URL input form
│   ├── VideoCard.tsx      # Video thumbnail, title, metadata
│   └── FormatList.tsx     # Format groups with download links
└── utils/
    └── format.ts          # formatBytes, formatDuration helpers
```

## How It Works

1. User pastes a video URL and clicks **Get Links**
2. RTK Query calls `GET /api/video/info?url=...` on the backend
3. The response is grouped into **Video + Audio**, **Video Only**, and **Audio Only** sections
4. Each format row links directly to `GET /api/video/stream` which streams the file from the server

## Supported Platforms

YouTube · Instagram · Facebook · Twitter / X
