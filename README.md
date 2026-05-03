# Fity React

Frontend for the Fity Downloader — a video download client built with React + Vite.

## Tech Stack

- **React 18** + **Vite 5**
- **Redux Toolkit** (RTK Query for API state)
- **React Router v6**
- **Tailwind CSS v3**

## Prerequisites

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
| `VITE_API_URL` | `` (empty) | Base URL of the Express backend. Empty in dev — Vite proxies `/api` to `localhost:3000` automatically. Set to your deployed API URL in production. |

## Available Scripts

```bash
npm run dev       # Start development server (HMR enabled)
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
```

## Project Structure

```
src/
├── main.jsx              # Entry point — Redux Provider + BrowserRouter
├── App.jsx               # Route definitions
├── index.css             # Tailwind directives
├── store/
│   ├── index.js          # Redux store
│   └── videoApi.js       # RTK Query API slice + stream URL builder
├── pages/
│   └── Home.jsx          # Main page (form + results)
├── components/
│   ├── UrlForm.jsx        # URL input form
│   ├── VideoCard.jsx      # Video thumbnail, title, metadata
│   └── FormatList.jsx     # Format groups with download links
└── utils/
    └── format.js          # formatBytes, formatDuration helpers
```

## How It Works

1. User pastes a video URL and clicks **Get Links**
2. RTK Query calls `GET /api/video/info?url=...` on the backend
3. The response is grouped into **Video + Audio**, **Video Only**, and **Audio Only** sections
4. Each format row links directly to `GET /api/video/stream` which streams the file from the server

## Supported Platforms

YouTube · Instagram · Facebook · Twitter / X
