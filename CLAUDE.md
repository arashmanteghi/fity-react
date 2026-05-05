# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run dev        # Vite dev server at http://localhost:5173 with HMR
npm run build      # tsc + Vite production build → dist/
npm run preview    # Preview the production build locally
npm run typecheck  # tsc --noEmit — type check without building
```

No test runner or linter is configured yet.

## Architecture

Single-page React + TypeScript app. No SSR. All data comes from the Express backend at runtime.

```
src/
  main.tsx              # Entry — Redux Provider + BrowserRouter
  App.tsx               # Route definitions (React Router v6)
  index.css             # Tailwind directives only
  vite-env.d.ts         # Vite import.meta.env type declarations
  types/
    video.ts            # Shared types: VideoInfo, VideoFormat
  store/
    index.ts            # Redux store — exports RootState, AppDispatch
    hooks.ts            # Typed useAppDispatch / useAppSelector
    videoApi.ts         # RTK Query API slice + buildStreamUrl helper
  pages/
    Home.tsx            # Only page — URL form, loading state, results
  components/
    UrlForm.tsx         # Controlled URL input form
    VideoCard.tsx       # Thumbnail, title, uploader, duration
    FormatList.tsx      # Grouped format rows (Video+Audio / Video Only / Audio Only) with download links
  utils/
    format.ts           # formatBytes, formatDuration helpers
```

## Data flow

1. User submits URL → `useLazyGetVideoInfoQuery` triggers `GET /api/video/info?url=`
2. RTK Query manages loading / error / data states
3. `VideoCard` renders metadata, `FormatList` renders grouped download links
4. Each download link points to `GET /api/video/stream?url=&format=&title=` — browser streams the file directly

## API

All requests go to the Express backend. In development, Vite proxies `/api/*` to `http://localhost:3000` — no CORS config needed locally.

Backend base URL is set via `VITE_API_URL` (empty in dev, Fly.io URL in production).

- `GET /api/video/info?url=` → `VideoInfo`
- `GET /api/video/stream?url=&format=&title=` → streamed video file

## TypeScript

- Strict mode enabled — no `any`, no unused locals/params.
- Shared API types live in `src/types/video.ts`.
- RTK Query endpoint is typed: `builder.query<VideoInfo, string>`.
- RTK errors are typed as `FetchBaseQueryError | SerializedError` — see `getErrorMessage()` in `Home.tsx`.
- Always use `useAppDispatch` / `useAppSelector` from `src/store/hooks.ts`, not the untyped ones from `react-redux`.
- Run `npm run typecheck` before committing.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_URL` | `` (empty) | Backend base URL — empty in dev (Vite proxy handles it), set to Fly.io URL in production |

## Deployment

- **Platform:** Vercel
- **Project:** `fity-react` (`prj_y7INSU64HMLu55KlILaALQKTpIjK`)
- **Backend:** https://fity-node-sparkling-firefly-5762.fly.dev

### First-time deployment steps

```bash
npx vercel                          # create project, deploy preview
npx vercel env add VITE_API_URL production
# paste: https://fity-node-sparkling-firefly-5762.fly.dev
npx vercel --prod                   # deploy to production
```

### Redeploy

```bash
npx vercel --prod
```

### Environment variables on Vercel

```bash
npx vercel env add VITE_API_URL production
```
