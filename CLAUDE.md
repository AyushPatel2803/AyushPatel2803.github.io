# Ayush Patel — Portfolio Handoff for Claude Code

## Project
React + Vite portfolio. Single page app.
- **Live site**: https://ayushpatel2803.github.io/My_Portfolio/
- **Dev server**: `npm run dev` → http://localhost:5173/
- **Deploy**: `git add . && git commit -m "msg" && git push` then `npm run deploy`
- **Main file**: `src/App.jsx` (everything lives here — components, styles, logic)
- **Background**: `src/ParticlesBackground.jsx`
- **Backup**: `src/App.backup.jsx` (pre-redesign restore point)

## How I Like to Work — Follow This Every Time

1. **Demo first, always** — Before making any change to the actual code, show me what it will look like. Use a code preview, a visual mockup, or describe it clearly. I need to approve the idea before you touch any file.
2. **Work locally** — Once I approve, make changes and tell me to check `http://localhost:5173/` on the dev server. Run `npm run dev` if it's not already running.
3. **Iterate until I'm happy** — If I don't like it, adjust and show me again. Don't push anything yet.
4. **Deploy only when I say so** — When I say "looks good, deploy" or "push it", then run:
   ```
   git add . && git commit -m "description" && git push
   npm run deploy
   ```
   Never deploy without my explicit sign-off.

---

## Session Log — 2026-06-17 (What We Did Today)

### Hero Section — 3 Changes COMPLETED ✅

**1. True Focus+ Animation (ScrambleHero)**
- **First load**: name fades in dimmed → blue box snaps onto "Ayush" → slides to "Patel" → box fades out → full white name. ~2.5s total.
- **Subsequent scroll-ins**: plays the scramble as before (38ms × 7 steps).
- Implementation: `firstRun` ref, `dim1`/`dim2` states, `boxVisible`/`boxPos` states, `wrapRef`/`ref1`/`ref2` for `getBoundingClientRect`. Box uses CSS transition on `left`/`width`/`opacity`.
- Blue box: `border: 2px solid #3b82f6`, `boxShadow: 0 0 18px rgba(59,130,246,0.5)`, `borderRadius: 6px`.

**2. Heading Replacement**
- Replaced: `"BS in Computer Science"` (static, dimmed)
- New: gradient `"Software Engineer"` (blue→violet→pink, `background-clip: text`) + em dash separator + `TypewriterRole` component
- Typewriter cycles: `"ML & LLM"` → `"Full Stack"` → `"React · Node"` → repeat
- Timing: 75ms/char typing, 40ms/char deleting, **1500ms pause** at full word
- Blinking cursor: stateful toggle every 530ms, `#60a5fa` color

**3. Resume Button — 3D Depth Push**
- Replaced: simple blue border rounded pill
- New: hard white offset shadow (`box-shadow: 3px 3px 0 rgba(255,255,255,0.16)`) + `transform: translate(-2px,-2px)` at rest
- Hover: lifts further (`-3.5px`, shadow `5px 5px`)
- Click/active: snaps flat (`translate(0,0)`, shadow `0`)
- Transition: `0.12s ease` on transform + box-shadow + color
- Color: `rgba(255,255,255,0.82)` → white on hover

**Other change this session:**
- "Patel" color: was solid blue `#3b82f6` → now plain **white** (same as "Ayush"). Both names white. The True Focus blue box provides the color accent instead.

---

## Session Log — 2026-07-05 (big session — hero, nav, background breakthrough)

- **Hero: ONE animation only.** True Focus plays once on first load (~4.5s, slowed so it's visible), then static. **Scramble REMOVED** (user decision). Out-of-focus word gets `blur(4px)` + 0.45 opacity. Component renamed `ScrambleHero` → `FocusHero`.
- **"Patel" = electric blue `#3b82f6`** (user decision — supersedes old "plain white locked"). "Software Engineer" = solid electric blue (gradient removed). Typewriter text + cursor = solid white.
- **Nav rebuilt:** AP logo circle top-left (spins on hover, scrolls home) + **Staggered Menu** top-right ("MENU +" → dark panel slides in, blue/violet pre-layers, numbered links cascade). Pill Nav was demoed and rejected. Old navbar + its CSS deleted.
- **Dual-persona "two innings" concept approved & PARKED** until CS side done: CS side (default) ↔ cricketer side, medallion switch shows the OTHER side's photo (graduation ↔ trophy pics — user will provide), accent flips blue↔gold, `?side=cricket` shareable. Cricket details TBD.
- All local; NOTHING deployed.

## What I'm Working On Right Now — BACKGROUND (direction found: SCROLL-SCRUBBED VIDEO)

**User's two key requirements (their words): the background must SAY "CS student", and the camera must TELL A STORY as you scroll.**

**The technique (locked):** scroll-scrubbed video — pre-extract video frames, scroll position picks the frame (motionsites.ai "3d-story" / Veldara template the user pasted). Engine already adapted with user's real content.

**Candidates (demo files in `public/`, open via dev server):**
- `bg-video-v13.html` — ★ **LATEST (2026-07-06)**: three-act story — cliff coder → approved motion dive (~0.40) → digital-flight bridge (Skills) → **portal arrival** (~0.60, chip grows as glowing circle ahead) → chip board. **USER VERDICT PENDING ("idk, we can talk more") — resume here.** v11 = approved-dive fallback; v12 = rejected direct jump. Transition rules + full state: `notes/background-redesign-state.md`.
- `bg-video-v8.html` — Pexels chip video (`bg-circuit.mp4`, free license, downloaded). **The backup — user likes it.**
- `bg-video-v9.html?v=2|5|8|9|chip` — 4 liked motionsites free videos (cliff coder / robot field / cloud dusk / galaxy) behind a switcher.
- `hero-liquid-glass.html` — Velorah-style looping hero (coders-under-stars video, liquid glass, Instrument Serif). No verdict yet; would force serif-vs-bold typography decision.
- `bg-video-v10.html` — stitched two-act story. **Concept REJECTED** ("those are 2 different ideas" — don't stitch unrelated clips).
- Tools: `bg-candidates.html` (motionsites free-video contact sheet), `video-frames.html?src=/x.mp4` (frame sheet).

**Story ideas (separate candidates):** 1) Cliff Coder — camera dives INTO his laptop to another world. 2) Chip — camera TOURS different parts of the board. AI generation (Kling/Veo) is the source for perfect takes; user found generators frustrating, so the pragmatic path = salvage takes with code (remap + bloom covers seams). Improved beats-based Kling prompt exists in chat/notes.

**Rejections this era (do not retry):** React Bits backgrounds ("too simple"), metaball/blob 3D ("ugly, doesn't say CS Student"), particle ribbon ("just lines"), Vanta, plus all old 3D-object shapes/finishes and CSS directions A/B/C/D.

**Full details:** `notes/background-redesign-state.md`. Old 3D-object-era demos (`bg-demo`, `bg-3d*`, `bg-celestia`, `bg-velorix`, `bg-3dportfolio`) are dead.

**⚠ Before any deploy: prune demo html/mp4 files from `public/` — everything in there ships.**

**To resume:** run `npm run dev`, then scroll `bg-video-v13.html` (three-act story) and give a verdict → tune portal/dive numbers if close → if good, integrate the scrub engine into the React app (replace `ParticlesBackground.jsx`, reduced-motion + mobile fallbacks).

---

## Palette
- bg: `#05030f`
- accent electric blue: `#3b82f6`
- gradient: `#60a5fa → #a78bfa → #f472b6`

---

## What's Already Built — DO NOT Redo or Break These

- **Preloader** — letters animate down, blue line draws, "PORTFOLIO" fades in
- **Hero** — massive clamp() name "Ayush Patel" ("Ayush" white, **"Patel" electric blue #3b82f6**), True Focus animation ONCE on first load (~4.5s, 4px blur on unfocused word), then static — NO scroll-back animation
- **Heading** — solid electric-blue "Software Engineer" + solid-white typewriter cycling roles (ML & LLM / Full Stack / React · Node), 1.5s pause
- **Nav** — AP logo circle top-left (spin on hover, scrolls home) + Staggered Menu top-right (MENU + → slide-in panel, numbered links)
- **Resume button** — 3D depth push style (hard offset shadow, lifts on hover, snaps on click)
- **Custom cursor** — white filled blob + dot, `mix-blend-mode: difference`. DO NOT change to ring.
- **Lenis smooth scroll** — whole page. Parallax uses direct `style.transform` in Lenis RAF, NOT Framer Motion useScroll (they don't sync)
- **Horizontal project showcase** — pins while scrolling, projects slide in from right. Ghost number, pill progress dots, progress bar fades on last project
- **WordReveal** — section headings blur+scale in, `once: false` so it replays on scroll
- **MagneticButton** — buttons spring-pull toward cursor (stiffness: 400, damping: 28)
- **Scroll animations** — labels slide from left, text fades up, skill cards stagger. All `once: false`
- **Footer** at bottom of contact section
- **Resume PDF** — `/public/Ayush_Patel_Resume.pdf`

---

## What Was Tried and REJECTED — Never Bring These Back

- Full-site horizontal scroll
- Vertical sticky project cards
- Marquee ticker
- Cursor as ring-only (no fill)
- Cursor comet trail
- Hero scramble animation (removed 2026-07-05 — one animation only: True Focus on first load)
- Pill Nav (built, compared, rejected in favor of Staggered Menu)
- Old CSS background directions A/B/C/D
- (Note: "Patel must be plain white" is DEAD — user chose electric blue #3b82f6 on 2026-07-05)

---

## Remaining Polish (After Background is Done)

- [ ] **Background** — user re-reviews `bg-video-v11.html` (fixed dive), then wire winning scroll-video into app
- [x] Nav — DONE: AP logo + Staggered Menu (2026-07-05)
- [ ] Dual-persona "two innings" switch (CS ↔ cricketer) — approved concept, parked until CS side done; needs photos + cricket details
- [ ] Floating contact form labels — animate up when typing
- [ ] Contact form loading + success states
- [ ] About text width — cap to ~65 chars per line
- [ ] Mobile responsive pass — horizontal scroll needs phone fallback
- [ ] SEO meta tags — title, description, og:image in index.html
- [ ] About section photo — not ready yet
- [ ] Add more projects — currently only 3

---

## Design Rules to Follow

- **Demo before editing** — always show what it'll look like first
- **motion-meaning** — every animation must express cause-and-effect, not just be decorative
- **excessive-motion** — max 1–2 animated elements per view. Background + content = already at the limit
- **duration-timing** — micro-interactions 150–300ms. Nothing over 400ms except the scramble
- **transform-performance** — animate only `transform` and `opacity`. Never `width`, `height`, `top`, `left`
- **easing** — ease-out for entering, ease-in for exiting
- **spring-physics** — prefer spring curves for interactive elements
- **reduced-motion** — wrap all animations in `prefers-reduced-motion` check
- **touch-target-size** — all buttons/links min 44×44px
- **mobile-first** — check mobile after every change

---

## Key Technical Notes

- Parallax: `style.transform` in Lenis RAF — NOT Framer Motion `useScroll`
- Hero focus: `FocusHero` component, `heroSectionRef` + `useInView(once:false, margin:"-20%")` triggers it; `firstRun` ref = plays once only
- Canvas animations: `setTimeout(fn, 300)` not `window.addEventListener('load')`
- `@media (pointer: fine) { *, *:hover { cursor: none !important; } }` — hides system cursor on desktop
- Contact form: `formsubmit.co` — only works on deployed site, not localhost
- TypewriterRole: `roles = ['ML & LLM', 'Full Stack', 'React · Node']`, 75ms type / 40ms delete / 1500ms pause
- Preview tooling: assistant's preview server runs on port 5180 (`.claude/launch.json`); user's own `npm run dev` on 5173 — same files. Video-heavy demo pages must be screenshotted via Chrome, not the preview tool.

---

## Restore

If anything breaks: copy `src/App.backup.jsx` → `src/App.jsx`
