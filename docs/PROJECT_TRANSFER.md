# Pathways Project Transfer

Prepared November 5 2026

## Read this first

This document transfers the project context from the original Windows Codex chat to a new Codex chat on a MacBook. It records the product intent, decisions, implementation history, live deployment, repository structure, setup commands, validation, known gaps, and next work. It is a project handoff rather than a verbatim chat transcript. Unrelated conversation, verification codes, credentials, and private database contents are excluded.

The project is called Pathways. The latest product direction is discovery from evidence in a student's life, especially completed coursework and academic strengths. The student should not have to know which career they want or select technical interests to receive recommendations. A catalog remains available behind the discovery flow.

The app is publicly hosted. People sign in with their own ChatGPT account to load and save a separate profile. The GitHub repository is also public. GitHub collaborator access is for changing code and is separate from using the website.

## Links and project identities

- Live app — https://pathways-career-explorer.epicstarfish1.chatgpt.site
- GitHub — https://github.com/ChinonsoNneji/pathways-career-explorer
- Primary branch — main
- Last verified implementation commit before this handoff — ac6027e0ea157c5d6adffcecae8847da4481975d
- Figma Make prototype — https://www.figma.com/make/rKrjyN1XRnZSpWTa9MNafk/Pathways-Career-Explorer
- Original visual reference — WDL APP official, APPROVED SPACE, in the user's Figma account
- WDL prototype reference — https://www.figma.com/proto/FDUxIhc0l4rByCI8o2wrg5/WDL-APP-official?node-id=542-2360
- Sites project ID — appgprj_6aec8adeac6c8191b5f9fb350ccd30d0
- Live Sites version — version 1
- Saved Sites version ID — appgprj_6aec8adeac6c8191b5f9fb350ccd30d0~appgver_f7494ea4c370819181ce8b6ba140285c
- Successful deployment ID — appgdep_6aec8bc72c4c819186d7e27f82021c8e
- Source commit used for that Sites version — 39a1df0bf19bdafc5f6ea099c87bcbb89c3cee42 in the Sites-managed source repository

The Sites source repository and the public GitHub repository are separate repositories. Their commit hashes differ. A GitHub push does not automatically deploy a new Sites version.

## Product purpose

Students often pick a major without understanding the roles it can lead to. They may also struggle to connect coursework, personal strengths, and everyday activities to practical career opportunities. Pathways should make those connections and help students test them through experience.

The intended experience has two parts. First, suggest a small number of plausible paths using evidence and explain why each appeared. Second, provide a structured journey into a selected role through courses, skills, projects, clubs, conventions, credentials, industry information, and ways to demonstrate readiness to employers.

The first target audience is students who have already chosen one of three majors — mechanical engineering, cybersecurity, and computer science. The later discovery direction allows recommendations across the catalog before asking students to commit to a role. More majors are expected later.

The user strongly prefers a direct experience with few unnecessary choices. Students choose a major once in the catalog flow, change it in Profile or Settings, and see a catalog focused on their major. Optional questions can refine results. The newest entry flow starts from coursework and does not require the student to select a career or technical interest.

Examples discussed include strong Linux and networking coursework leading to network forensics or infrastructure, SQL and Python experience leading to data engineering, and mechanics or design coursework supporting automotive engineering. Investigative or automotive video topics were proposed as secondary clues. These examples are hypotheses to test, not validated aptitude measures.

## Intended connected experience

Pathways should feel like an ongoing companion to a student's learning. The user proposed connecting academic records from Stellic, learning systems such as Brightspace, and optional YouTube activity.

The app is the home base. A connector or extension would be installed or connected once, then sync approved signals in the background. Students should review summaries and recommendations in Pathways rather than repeatedly opening an extension popup.

The planned Data sources page should show each connection, its status, last sync, what evidence was received, which recommendations changed, and controls to pause or remove data. The current panel only labels coursework import and planned school and YouTube connections. No browser extension or live external connector has been built.

Stellic's developer documentation describes institution-level partner integrations. It does not establish that a student can grant this app direct API access to grades. A pilot school must confirm available fields, access, and integration arrangements. Brightspace integration was discussed but not implemented or technically validated.

YouTube's standard Data API does not expose watch history. A user-selected export or a deliberately scoped, consent-based browser connector was discussed as a possible later approach. No watch history has been collected. No general application tracking, cross-device monitoring, or native phone activity collection exists.

The intended recommendation approach gives stronger weight to demonstrated coursework and trial feedback than to entertainment viewing. Students should review inferred signals and be able to correct them. The current code implements much simpler deterministic heuristics.

## Business model discussion

The first business overview framed Pathways as a personalized career exploration and planning platform. Students are the users. Schools, career centers, and advising teams were proposed as potential buyers.

A paid pilot for a cohort, followed by an annual institutional license, was a working hypothesis. No pricing, buyer interviews, sales commitments, contracts, revenue, or school partnership has been established.

Suggested pilot measures were whether students understand recommendations, try a concrete next step, return to the roadmap, and find roles they had not considered. Advisor usefulness and willingness to pay also require validation.

## Implementation history

1. Opened a new VS Code folder on Windows named new-project-20261103-194829.
2. Built an initial HTML and JavaScript assessment with four roles and browser-local roadmap progress.
3. Added a Node HTTP API for recommendations and moved role data into pathways.js.
4. Inspected the WDL Figma reference. Its visual cues included violet and indigo texture, bold uppercase italic headlines, rounded controls, and high contrast.
5. Restyled the simple HTML prototype. The user later rejected its visual mismatch with the Figma design.
6. Narrowed the audience to the three majors and expanded to 15 backend role records with deterministic matching.
7. Created Pathways Career Explorer in Figma Make. Expanded it with welcome, dashboard, assessment, catalog, comparison, role details, saved roadmaps, progress, and profile screens.
8. The Figma-generated catalog initially had 12 roles despite a 15-role request. A follow-up Figma build normalized it to 15.
9. Figma Make reached its daily AI credit limit. Work continued in code at the user's request.
10. Expanded the backend catalog to 26 records, added courses and activities, sourced market benchmarks and external resources, and added major-focused comparisons.
11. Downloaded a local Figma .make export and recovered the actual React source from its embedded Git object packs. This replaced the approximate UI with the real Figma screen structure.
12. Merged the Figma role data with the expanded backend roles. The resulting UI catalog has 31 records, described below.
13. Added a local SQLite database, cookie-based browser sessions, a profile API, and queued profile saving.
14. Published the code to the public GitHub repository after GitHub sign-in and authorization. Later pushes worked through Git Credential Manager.
15. Added coursework CSV discovery with explained suggestions and try-it activities. This is a coded prototype and was tested with sample coursework.
16. Created a separate Sites hosting checkout, adapted the interface to Vinext, added cloud D1 storage and ChatGPT sign-in, and published the app.
17. Added the hosted source, discovery changes, and a root README to GitHub in commit ac6027e.
18. Invited the requested GitHub collaborators. Both invitations were pending at the last check. The email supplied by the user resolved to JordanBrunson. The second username was LANman2000, displayed as Lanre Ayegbusi.

## Repository map

The hosted application is the primary target for future work.

- hosted/app/page.tsx — public entry, profile loading, sign-in link, and client app mounting
- hosted/app/pathways/PathwaysJourney.tsx — application screens, navigation, profile state, saves, comparisons, and roadmap progress
- hosted/app/pathways/Discovery.tsx — CSV import, course review, course-to-role heuristic matching, three suggested paths, and trial feedback
- hosted/app/pathways/pathwaysData.ts — Figma role definitions, extra role details, signals, aliases, and expanded catalog merge
- hosted/app/pathways/catalog.json — snapshot of the 26 backend roles used to expand the UI
- hosted/app/pathways/courses.json — supported coursework classification snapshot
- hosted/app/pathways/resources.json — curated market benchmarks and external resource links
- hosted/app/globals.css — Figma-derived design styles and discovery additions
- hosted/app/layout.tsx — page metadata and root layout
- hosted/app/api/v1/profile/route.ts — authenticated GET and PUT profile API
- hosted/db/schema.ts — Drizzle schema for cloud student profiles
- hosted/drizzle/0000_first_bulldozer.sql — initial schema migration
- hosted/drizzle/meta — generated migration journal and snapshot
- hosted/.openai/hosting.json — Sites project identity and DB binding
- hosted/vite.config.ts — Vinext, Sites, Cloudflare, and local connector-preview integration
- hosted/worker/index.ts — production Worker entry point from the supported starter
- hosted/scripts — maintained build, install, local environment, and Sites integration helpers
- hosted/app/chatgpt-auth.ts — supported sign-in helper module
- ui/src — original Vite React application, including discovery
- ui/vite.config.ts — local Vite build with role/resource definitions derived from root modules
- server.js — original Node HTTP server, static UI delivery, recommendation API, and local profile API
- database.js — original SQLite database, role seeding, and browser session profiles
- pathways.js — 26 backend role records, majors, course and activity definitions
- resources.js — source market/resource data used by the original app
- app.js and index.html — earlier buildless prototype retained in the repository
- README.md — live URL, source layout, local run instructions, and current scope

The starter includes unused UI components and example integration support. Do not infer that they are completed Pathways features.

## Current runtime architecture

The public site uses React and TypeScript on the Vinext starter, Vite, Tailwind-compatible styling, and Cloudflare Workers. D1 provides persistent student records. The Sites integration manages deployment and sign-in routing.

The public entry page displays a Sign in with ChatGPT link when the profile API returns 401. Signing in is a top-level navigation to /signin-with-chatgpt?return_to=%2F. Sites owns the sign-in and callback flow. Do not add a separate implementation of those reserved routes.

The API reads the trusted oai-authenticated-user-id request header supplied by the hosting platform and uses that stable per-Site ID as the database key. The application does not use email as its primary key. Anonymous visitors can see the entry page, while profile reads and writes require identity.

Cloud schema:

```sql
CREATE TABLE students (
  user_id TEXT PRIMARY KEY,
  profile TEXT NOT NULL
);
```

The profile column contains JSON with onboarded, major, selected, saved, compare, completed, and name. Major IDs are mechanical, cybersecurity, computer-science, or null. selected, saved, and compare are string arrays. completed maps role titles to boolean step arrays. name defaults to Alex in the inherited prototype.

GET /api/v1/profile returns a profile or null for a newly signed-in user. PUT validates and replaces the complete profile through an upsert. Responses use Cache-Control no-store. Saves are serialized through a promise queue in the client. Failed saves show a retry action.

The hosted PUT accepts up to 32 KB after reading the body. It bounds string arrays to 200 elements, comparison to two roles, names to 100 characters, and completion entries to 200 with up to 20 booleans each. It rejects a supplied Origin that differs from the request URL origin. The frontend uses three-step roadmaps today.

The original local server instead uses node:sqlite and a random HttpOnly SameSite cookie to select a browser-scoped profile. It seeds a roles table from pathways.js at startup. The local database is excluded from Git and was not migrated to D1. Its user session is different from production ChatGPT identity.

## Catalog and matching

Earlier replies mentioned four roles, then 15, then 26. These are milestones. As verified from the final hosted data module, the UI contains 31 roles because it preserves some Figma-specific roles while merging the 26 backend records.

Mechanical engineering has 8 roles:

- Robotics Engineer
- Automotive Engineer
- Manufacturing Engineer
- Thermal Systems Engineer
- Product Design Engineer
- HVAC design
- Reliability engineering
- Test engineering

Cybersecurity has 11 roles:

- Incident Response Analyst
- Digital Forensics Examiner
- Network Security Engineer
- Threat Detection Engineer
- Security Analyst
- Network engineering
- Network forensics
- Network infrastructure
- Application security
- Cloud security
- Identity and access management

Computer science has 12 roles:

- Software Engineer
- Cloud / DevOps Engineer
- Data Engineer
- Machine Learning Engineer
- Full-Stack Engineer
- Cloud engineering
- Cloud infrastructure
- DevOps
- Site reliability engineering
- Platform engineering
- QA automation
- Distributed systems engineering

Some role names overlap semantically. Combined Cloud / DevOps Engineer and separate cloud and DevOps entries remain. Title capitalization also varies. This is existing content debt.

The optional assessment ranks by how many role tags exactly match selected signals. The original Node recommendations API instead weights coursework and skills at two points and activity signals at one point. These implementations are not unified.

Coursework discovery uses keyword groups for networking, operating systems, forensics/security, programming, databases, statistics/machine learning, thermal subjects, mechanical design/materials, and controls/robotics. It matches course names against role title, field, tags, and learning content. Courses at C or above contribute grade points. It sums matched grade points per role and returns the top three across majors.

This heuristic is a prototype. It does not normalize course difficulty, credits, academic level, institutional grading, instructor differences, course descriptions, or repeated broad keywords. It does not measure aptitude or calibrated probability. Broad security matching can produce several similar suggestions with identical evidence.

## Discovery CSV behavior

The first screen for a new hosted profile is discovery. Existing profiles with a major normally open the catalog. A direct #discovery URL opens discovery.

The flow is add coursework, review parsed rows, confirm discovery, then inspect up to three paths. A sample transcript button fills:

```csv
course,grade
Computer Networks,A
Operating Systems,A-
Digital Forensics,B+
Calculus,B
```

The parser accepts a two-column CSV with an optional course,grade header, letter grades, basic quoted names, and doubled quotes inside names. It accepts up to 200 course rows plus a header and files up to 100 KB. It rejects malformed rows with a row-specific message. It is not a general transcript parser and does not support multiline quoted fields, PDF transcripts, numeric grades, credits, or school-specific grade codes.

Duplicate course names are case-insensitive and the highest grade is retained. Changing the input clears the prior reviewed result. The raw import, parsed rows, active trial, and feedback stay in component memory. Reloading loses them. They are not saved to the profile API.

Try the work opens the role's project and deliverable. Feedback is Yes, Maybe, or No. That feedback currently does not alter ranking or persist. Open roadmap opens the existing role details. The discovery component remains mounted but hidden while navigating, so its state survives ordinary in-app navigation during the same page load.

## Screens and interaction state

The Figma-derived app contains welcome/demo content, home dashboard, assessment, results, major-focused catalog, two-role comparison, role details, saved roadmaps/progress, and Profile settings. Discovery was added in code after the Figma build.

Choosing a major in the assessment leads directly to that major's catalog. Refine my matches opens optional course, skill, and activity selections. Profile allows changing the major and clears selected signals and comparison choices. Saved roles and completion data are retained across a major change.

The catalog filters to the chosen major and supports text search. A Compare button adds up to two roles. A bottom comparison dock opens comparison. Role details include work examples, reason signals, project and deliverable, three milestones, courses, skills, optional credentials, resources, and related roles.

The browser history uses page and role state plus hash URLs. Initial loading explicitly recognizes #discovery, but most other hash routes are not fully reconstructed on refresh. A saved major generally causes a refresh to return to the catalog. True deep-link routing needs work.

The initial welcome/demo branch still exists even though the newest entry is discovery. The demo action preloads sample choices. Navigation can reach older welcome wording. Several labels still say Sample data or Student prototype. These are accurate prototype labels, but copy and flow need a consistency pass.

## Market data and resources

Comparison displays broad U.S. occupation benchmarks, with source links and dates. These are not unique salaries for every specialization. The data is a static researched snapshot, not a live feed.

- Mechanical engineers — May 2025 median annual wage $104,110, projected annual openings 17,800, growth 11 percent over 2025–2035.
- Information security analysts — May 2025 median annual wage $129,180, projected annual openings 14,100, growth 21 percent over 2025–2035.
- Software developers — May 2025 median annual wage $135,980, mean $148,100, projected annual openings 95,300, growth approximately 10.2 percent over 2025–2035.

Mechanical roles share the mechanical benchmark. Cybersecurity roles share the security analyst benchmark. Computer science roles share the software developer benchmark. A more precise occupation mapping is unfinished.

Hiring and layoff context uses seasonally adjusted BLS industry counts in thousands for July, August, and September 2026. Durable goods manufacturing hires are 179, 193, 174 and layoffs/discharges are 47, 52, 56. Information industry hires are 62, 70, 94 and layoffs/discharges are 38, 42, 46. Cybersecurity and computer science share the Information industry context.

Role-specific layoffs, a job-security score, current job postings, and quarter-over-quarter trends were requested but remain unfinished. The UI explicitly marks unavailable role-specific estimates.

External resources include MIT OpenCourseWare mechanical engineering, Formula SAE, PortSwigger Web Security Academy, Harvard CS50x, GitHub Skills/Learn, ASME IMECE, RSA Conference, and KubeCon. Convention details in the snapshot are ASME IMECE November 8–12 2026 in Vancouver, RSA Conference April 5–8 2027, and KubeCon North America November 8–11 2027 in New Orleans. Recheck the official pages before making travel or purchasing decisions or presenting future dates as current.

Primary source links:

- https://www.bls.gov/ooh/architecture-and-engineering/mechanical-engineers.htm
- https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm
- https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
- https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm
- https://www.bls.gov/news.release/ocwage.t01.htm
- https://www.bls.gov/news.release/jolts.t02.htm
- https://www.bls.gov/news.release/jolts.t05.htm
- https://event.asme.org/IMECE
- https://www.rsaconference.com/usa
- https://www.cncf.io/kubecon-cloudnativecon-events/
- https://ocw.mit.edu/search/?d=Mechanical+Engineering
- https://www.fsaeonline.com/
- https://portswigger.net/web-security
- https://cs50.harvard.edu/x/
- https://skills.github.com/
- https://docs.stellic.com/
- https://developers.google.com/youtube/v3/revision_history
- https://support.google.com/accounts/answer/3024190

## Visual design decisions

The user approved the Figma flow and wants the actual design retained. They rejected a local approximation that copied only the palette. Future work should start from hosted/app/pathways and preserve the screen hierarchy and component styling.

The design uses dark plum backgrounds, violet and indigo accents, rounded cards, Archivo Black display typography, DM Sans body typography, and small tracked labels. CSS imports fonts from Google Fonts. The initial WDL reference was mobile. The coded app adapts it to desktop and mobile.

The Figma project remains a separate prototype. Live code changes do not automatically update it. Its daily AI credits were exhausted during the session. A later reset or upgrade would be needed for further Figma Make prompting. Do not assume that limit is still active on a later date.

## Set up the MacBook

Install Git, VS Code or another editor, and Node.js 22.13 or later. The original local SQLite variant also relies on node:sqlite support. Use the same GitHub account or an account with repository access to push.

```bash
git clone https://github.com/ChinonsoNneji/pathways-career-explorer.git
cd pathways-career-explorer
code .
```

If code is unavailable in Terminal, open the cloned folder from the editor's File menu.

For the hosted application:

```bash
cd hosted
npm run install:ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_first_bulldozer.sql
npm run dev
```

Open the Local URL printed by the development server. The local sign-in flow simulates a test identity. Production uses real Sites-managed ChatGPT identity. Local D1 data is separate from production.

Apply the initial migration once per fresh local database. After adding schema changes, generate a new migration and apply only pending migrations in order. Do not rewrite already-applied migration files.

For the original Windows-style local variant:

```bash
cd ui
npm ci
npm run build
cd ..
node server.js
```

Then open http://127.0.0.1:4173/. That address only works on the computer running the local server. The public Site remains available when the user's Windows computer is off.

## Team workflow

Use git pull before starting. Work in a branch, commit the change, push, and open a pull request for teammates to review. GitHub collaborators can push after accepting their invitations. The invitations do not confer Sites editing or deployment access.

```bash
git pull
git switch -c feature/short-description
# Make and verify changes.
git add <changed-files>
git commit -m "Describe the change"
git push -u origin feature/short-description
```

Use the hosted directory for the public app. Changes only in ui or root server.js do not update the hosted app. hosted/app/pathways/catalog.json and resources.json are snapshots, so edits to root pathways.js or resources.js also need an intentional hosted update.

## Publish a future update

The new MacBook Codex chat should use the Sites skill and discover current Sites tools. Load the exact project ID from hosted/.openai/hosting.json and inspect the existing Site before editing or publishing. The Site audience is public and should remain public unless the owner asks for a change.

The publishing flow used here:

1. Get the existing Site and a fresh source repository write credential.
2. Open the Sites-managed source checkout using the supported site-workflow helper and the returned credential. Keep the token in memory and supply it through hidden stdin.
3. Apply the intended hosted source changes to that checkout. Preserve .openai/hosting.json and the maintained Sites/Vinext integration.
4. For schema changes, update db/schema.ts, run npm run db:generate, inspect the generated SQL and metadata, and apply pending migrations locally.
5. Run TypeScript and the supported build helper, then test the relevant flow.
6. Package and push the exact Sites source state with site-workflow.mjs. Retain its returned commit SHA and archive path.
7. Call save_site_version with that project ID, commit SHA, and unchanged archive.
8. Because this is a public Site, call deploy_site_version with the returned saved version ID.
9. Poll get_deployment_status only while pending, building, or publishing. Report the URL after success.
10. Sync the authored hosted source back to GitHub and verify the remote branch.

The plugin scripts and local filesystem locations on the Windows machine are not Mac paths. Discover the installed skill and script paths in the Mac chat. The public project ID stays the same. The new Codex account must have Sites owner/editor access to publish. If it uses the same ChatGPT account, inspect the Site tools before asking the user to recreate anything.

Do not store credentials, downloaded auth material, local .env files, private database files, node_modules, build artifacts, or .wrangler state in Git. Source archives used for publication are deployment artifacts and should be kept outside the tracked checkout or under ignored outputs.

## Validation already performed

- JavaScript syntax checks passed for the original frontend, server, and catalog modules.
- Original recommendation API checks covered major filtering, expected ranking on sample profiles, empty-signal profiles, resource serving, and portfolio fields for 26 backend roles.
- The actual Figma-derived Vite build and TypeScript check passed after fixing two malformed inline TypeScript type declarations in the export.
- Local SQLite checks covered new empty profiles, save and reload, and isolation between cookie sessions.
- Browser checks covered major selection, two-role comparison, sample transcript review, three suggested paths, and opening a trial activity.
- The hosted Vinext build and TypeScript check passed.
- The local hosting preview exercised sign-in simulation, major selection, profile saving, and persistence after reload. Preview logs showed successful profile GET and PUT responses.
- Sites deployment status returned succeeded for version 1.
- The public entry page rendered with the Pathways title and Sign in with ChatGPT action.
- GitHub remote main was verified equal to ac6027e after the hosted source push.

Production sign-in and profile persistence across two real accounts and two physical devices were not exercised in this chat. The intended separation is implemented server-side, but a real end-to-end acceptance test remains valuable.

## Known limitations and unfinished work

- No live Stellic, Brightspace, YouTube, social, phone, or native application connector.
- No packaged browser extension, background sync worker, source permission UI, or actual last-sync feed.
- Coursework imports and trial feedback are temporary in the current tab.
- Discovery feedback does not feed back into ranking.
- No normalized course catalog, syllabus ingestion, course-credit weighting, institutional grading conversion, or academic performance calibration.
- Role matching is deterministic keyword/tag logic and needs validation with students and advisors.
- Multiple overlapping role records and uneven roadmap depth remain.
- Some new role descriptions are task snippets derived from starter steps.
- Comparison statistics are broad static occupation/industry proxies. No role-specific job security or quarter comparison.
- Current profile storage is a whole-document upsert. The client queues writes within one tab, but concurrent devices can overwrite each other's complete profile. Revision-based conflict handling is unfinished.
- Some malformed input or database failures return a generic 400, and body-size checks occur after reading the request.
- Saved role titles are not verified against the catalog by the hosted profile API.
- Profile name defaults to Alex and there is no dedicated sign-out control in the Pathways shell.
- Initial route reconstruction handles discovery specially. Other deep links and back/forward behavior need a fuller routing pass.
- Frontend and backend role data are duplicated. There is no single catalog service used by every variant.
- No production monitoring, automated release pipeline, billing, institutional administration, or validated recommendation-quality measures.
- The original local server stopped between sessions more than once. Restarting it restored localhost. The public hosted app removes that dependency for team use.
- Google Fonts is an external resource. Offline typography can differ.

## Next work to discuss with the owner

The owner most recently emphasized discovery from academic evidence and a connector that works quietly after setup while the app explains the results. Preserve that direction.

A practical next increment is to persist reviewed coursework, evidence provenance, and trial feedback per user in cloud tables. Show the latest evidence and suggestions on the home dashboard. Keep imports reviewable and removable. Then validate recommendations against a small set of real or consented test transcripts.

For a live connector, establish one institution's approved source and fields before promising automatic grade access. Design a connector ingestion API with source status and sync history. A browser extension, if chosen, requires a separate build, explicit source permissions, secure pairing, deduplication, retry handling, revocation, and a clear boundary on collected data.

Other useful tasks are deduplicating role records, improving course matching, adding durable versioned profile updates, testing real production sign-in on Mac and Windows, and making deployment from the team repository easier.

## Instructions for the receiving Codex chat

Read this document and the repository README first. Inspect the current main branch and hosted/.openai/hosting.json. Treat hosted as the live application source and preserve the Figma-derived UI. The newest product goal is automatic, explainable discovery based on student evidence, with optional connected signals and an app-based overview.

Do not assume the planned connectors exist, that the recommendation heuristic is validated, or that all data labeled in the UI is live. Use the status and known limitations above as the baseline. Verify current hosting state and source before deploying. Continue from the owner's next instruction rather than rebuilding the project from scratch.
