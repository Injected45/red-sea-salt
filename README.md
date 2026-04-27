# Red Sea Salt — Production Build

This is the **`build`** branch — it holds compiled production artifacts only.

> **Source code lives on [`main`](https://github.com/Injected45/red-sea-salt/tree/main).**
> Do not edit files in this branch directly. They are overwritten on every build.

## What's in here

| Path | Purpose |
|------|---------|
| `.next/` | Next.js compiled output (server bundles, static chunks, route manifests) |
| `public/` | Static assets (logo, hero, product images, videos, placeholder) |
| `package.json` + `package-lock.json` | Locked dependency versions for `npm install --omit=dev` |
| `next.config.mjs` | Runtime config |

Built from: `main@1e7f1d0`

## Deploy on a Node host (VPS, Docker, EC2, etc.)

```bash
git clone -b build https://github.com/Injected45/red-sea-salt.git
cd red-sea-salt
npm install --omit=dev

# set Supabase env vars
export NEXT_PUBLIC_SUPABASE_URL="https://<project>.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
export SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
export PORT=3000

npm start
```

## Notes

- This branch is **force-pushed** on every build refresh — never commit changes here, they will be lost.
- For Netlify or Vercel deploys, point the platform at the `main` branch instead — they rebuild from source automatically.
- `.env.local` is **never** committed. Inject env vars at the host level.
