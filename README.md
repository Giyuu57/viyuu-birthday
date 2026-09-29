# For Viyuu ♡

A small interactive romantic birthday website — React + Vite + TypeScript +
Tailwind + Framer Motion on the frontend, Node/Express + MongoDB (optional)
on the backend.

**It's fully populated and ready to run as-is** — a placeholder letter,
six placeholder doodles, and a short original background melody are already
included, so `npm install && npm run dev` gives you the complete experience
immediately, with nothing to add or edit. When you're ready, you can swap in
your own letter, drawings, and song (see section 3 below) — but you don't
have to.

---

## 1. Install

From the project root:

```bash
npm install
npm run dev
```

That's it. This is an **npm workspaces** project, so the one root
`npm install` installs `client/` and `server/` dependencies together, and
`npm run dev` starts both at once:

- Backend API: **http://localhost:5000**
- Frontend site: **http://localhost:5173** ← open this one in your browser

If you'd rather run them separately (two terminals):

```bash
npm run dev:server
npm run dev:client
```

The frontend works even if the backend isn't running — it falls back to
the content already baked into the client.

---

## 2. Configure `.env` (optional)

```bash
cp .env.example server/.env
```

Open `server/.env`:

```ini
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=
```

- `PORT` — which port the Express API runs on.
- `CLIENT_ORIGIN` — used for CORS; the Vite dev server's URL.
- `MONGO_URI` — **completely optional.** Leave it blank and the site runs
  fine without a database, using the content in `client/src/data/content.ts`.
  Only fill this in if you want to manage content through MongoDB instead
  (see "Connect MongoDB" below).

---

## 3. Personalize it (optional — everything already works without this)

The site ships with a placeholder letter, six placeholder doodles, and a
short original instrumental track, all generated so the experience feels
complete out of the box. Replace any of them whenever you like:

**Your handwritten letter** — save your image over:
```text
client/public/assets/handwritten-letter.png
```
(`.jpg`/`.webp` also work — update the one `src="/assets/handwritten-letter.png"`
line in `client/src/components/Letter/Letter.tsx` if you change the extension.)

**Your drawings** — replace or add to the files in:
```text
client/public/assets/drawings/
```
Any filenames work — the backend (`GET /api/drawings`) scans this folder and
returns whatever `.jpg`, `.jpeg`, `.png`, or `.webp` files it finds, sorted
naturally. Nothing needs to be registered or hardcoded. Delete the six
placeholder doodles if you don't want them mixed in with your own.

**Your song** — replace:
```text
client/public/assets/birthday-song.mp3
```
Browsers block audio autoplay before a user interacts with the page — this
is expected and already handled: the song starts right when she clicks
"Open your surprise ✨", with a smooth fade-in.

---

## 4. Change the birthday messages

Every piece of text on the site lives in **one file**:

```text
client/src/data/content.ts
```

Open it, edit any string, save — that's the whole workflow. Nothing else
needs to change. (If you've connected MongoDB, see the next section for the
alternative, server-side way to edit content.)

---

## 5. Connect MongoDB (optional)

You do **not** need this for the site to work. It exists only if you'd like
to manage the text content from a database instead of editing
`content.ts` directly (e.g. building an admin panel later).

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   or run MongoDB locally.
2. Put the connection string in `server/.env` as `MONGO_URI=...`.
3. Restart the server. On startup it will log `✅ MongoDB connected`.
4. Insert a document into the `sitecontents` collection with `key: "default"`
   and the same shape as `server/data/defaultContent.js` — `GET /api/content`
   will then serve that instead of the built-in defaults.

If the connection ever fails or no document exists, the API automatically
falls back to the default content — the site can never "break" because of
the database.

---

## 6. API reference

| Method | Route             | Description                                      |
|--------|-------------------|---------------------------------------------------|
| GET    | `/api/health`     | Health check                                       |
| GET    | `/api/content`    | Site text content (DB if connected, else defaults) |
| GET    | `/api/drawings`   | List of drawing files currently in the assets folder |

---

## 7. Project structure

```text
viyuu-birthday/
├── client/                  React + Vite + TS + Tailwind + Framer Motion
│   ├── src/
│   │   ├── components/      One folder per feature (Hero, BirthdayCake, ...)
│   │   ├── pages/           Home.tsx composes all sections
│   │   ├── hooks/           useContent, useDrawings, useBackgroundMusic, ...
│   │   ├── animations/      Shared Framer Motion variants
│   │   ├── data/content.ts  ✏️ All editable text lives here
│   │   └── types/           Shared TypeScript interfaces
│   └── public/assets/       handwritten-letter.png, drawings/, birthday-song.mp3
│
├── server/                  Node + Express + Mongoose
│   ├── controllers/         Request handlers
│   ├── routes/               /api/content, /api/drawings
│   ├── models/               Mongoose schema (optional DB content)
│   ├── config/db.js          Graceful, optional MongoDB connection
│   └── server.js
│
├── .env.example
└── package.json              Root scripts to run both together
```

---

## 8. Build & deploy

**Build the frontend for production:**

```bash
npm run build
```

Output goes to `client/dist/` — deploy this as a static site (Netlify,
Vercel, GitHub Pages, Cloudflare Pages, etc.).

**Run the backend in production:**

```bash
npm start
```

This runs `server/server.js` with plain `node` (no nodemon). Deploy it
anywhere that runs Node (Render, Railway, Fly.io, a small VPS, etc.), set
`MONGO_URI` and `CLIENT_ORIGIN` (to your deployed frontend's URL) as
environment variables there.

If you don't need the backend at all (no database, drawings folder is
small and fixed), you can also skip deploying `server/` entirely — just
build the frontend and host it as a static site. The gallery will simply
show placeholder doodles instead of auto-loading drawings, since that
relies on the `/api/drawings` endpoint.

---

## Performance & accessibility notes

- Drawing images use `loading="lazy"`.
- All animation respects `prefers-reduced-motion` (see
  `usePrefersReducedMotion` and the global CSS media query).
- Cursor/tap particles are throttled and short-lived by design — meant to
  be a subtle touch, not a performance hog.
- Framer Motion's `whileInView` + `viewport={{ once: true }}` is used for
  scroll reveals so nothing re-animates repeatedly while scrolling.

Made with ♡, just for Viyuu.
