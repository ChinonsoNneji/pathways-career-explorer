# Pathways Career Explorer

Live app: https://pathways-career-explorer.epicstarfish1.chatgpt.site

Open this link on your Mac or share it with teammates. Sign in with ChatGPT to save a separate profile and resume your progress across devices. Existing profiles from the local SQLite demo are stored only on the computer where they were created.

## Source layout

- hosted/ contains the published application, cloud profile API, database schema and migrations.
- ui/ contains the original Vite interface.
- server.js and database.js run the original local Node and SQLite version.

## Run the hosted app locally

Use Node.js 22.13 or later.

    cd hosted
    npm run install:ci
    npm run build
    node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_first_bulldozer.sql
    npm run dev

Open the URL printed by the dev server. Local development simulates sign-in with a test account. Production uses ChatGPT sign-in and cloud profile storage.

## Run the original local app

    cd ui
    npm ci
    npm run build
    cd ..
    node server.js

Open http://127.0.0.1:4173/. The SQLite database is ignored by Git.

## Current scope

The app includes coursework CSV discovery, career browsing, comparison and saved roadmaps. School and YouTube integrations are planned. Imported coursework and discovery feedback currently stay in the browser tab.
