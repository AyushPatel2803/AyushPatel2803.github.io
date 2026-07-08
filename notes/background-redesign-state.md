# Background redesign + site work — resume notes

Updated 2026-07-08. This supersedes everything below from the old 3D-object hunt era.
Summary also lives in `CLAUDE.md` → "What I'm Working On Right Now" (auto-loads each session).

**🚀 DEPLOYED 2026-07-08:** hero (True Focus once, blue Patel), nav (AP logo + Staggered Menu), blue SE title + white typewriter are LIVE at https://ayushpatel2803.github.io/ (gh-pages branch of the user-page repo; deploy script fixed). The live background is still the OLD particle stars — the video-story background (v13) is local-only, verdict pending. Demo files are gitignored; move them out of `public/` during any deploy (rule is in CLAUDE.md).

## ✅ DONE earlier (2026-07-05 session)

**Hero text (in `src/App.jsx`):**
- ONE animation only: True Focus on first load (~4.5s total: dim → blue box on "Ayush" → glides to "Patel" → resolves). Scramble REMOVED. No animation on scroll-back. Component renamed `ScrambleHero` → `FocusHero`.
- Out-of-focus word during True Focus: `blur(4px)` + opacity 0.45.
- **"Patel" = electric blue #3b82f6 now** (user decision — SUPERSEDES the old "plain white locked" rule).
- "Software Engineer" = solid electric blue (gradient removed). Typewriter roles = solid white (cursor too).

**Nav (in `src/App.jsx`):**
- Old navbar deleted. Now: **AP logo top-left** (blue circle, spins+glows on hover, scrolls home) + **Staggered Menu top-right** ("MENU +" → dark panel slides in with blue/violet pre-layers, numbered links cascade). React Bits style. Pill Nav was built and REJECTED in favor of Staggered.

## 🏏 PARKED: dual-persona "two innings" concept (user loves it, waits until CS side done)
- Two sides: CS engineer (default) ↔ cricketer. The corner medallion becomes the switch, showing the OTHER side's photo (graduation pic ↔ trophy-lifting pic — user will provide both).
- Accent flips blue ↔ gold sitewide; sweep transition; `?side=cricket` shareable; remember choice.
- Everything mirrors: hero roles, capabilities→batting/bowling/fielding stats, projects→matches/trophies. Contact shared.
- Background videos flip too (see below — a golden/stadium video for cricket side).
- Need from user: cricket details (role, stats, teams), the two photos, accent choice (gold demoed).

## 🎬 THE BACKGROUND — current direction: SCROLL-SCRUBBED VIDEO (this is the one)

**Journey of rejections (do not retry these):**
- Current particle stars: disliked. React Bits backgrounds: "too simple". Abstract 3D (metaballs/blob): "ugly, doesn't say CS Student". Particle ribbon: "just lines". Vanta: skipped. All shapes/finishes from the old object-hunt: still dead.
- **KEY INSIGHT (user's words): the background must SAY "CS student" and the camera must TELL A STORY as you scroll.**

**The breakthrough:** user pasted motionsites.ai "3d-story" template (Veldara page) → scroll-scrubbed video technique (video frames extracted, scroll position picks the frame). Engine adapted with user's real content. motionsites.ai = prompt+asset library (user's reference site; their free "Copy URL" videos are usable; premium locked).

**Two story ideas (SEPARATE candidates, do NOT stitch them — v10 stitching was rejected):**
1. **Cliff Coder dive**: camera starts wide on coder-on-cliff → dives INTO his laptop → emerges in a digital world.
2. **Chip tour**: camera tours DIFFERENT PARTS of a circuit board like a city (not just push-in).

**Assets in `public/`:**
- `bg-circuit.mp4` — Pexels chip video (free license, 7.7MB, downloaded). THE BACKUP — user likes it.
- `cliff-take1.mp4` — user's own Kling generation of the cliff-dive prompt (5s). 80% good; flaws: short + laptop screen shows white doc instead of digital world.
- motionsites free picks user liked: #2 cliff coder, #5 robot field, #8 cloud dusk, #9 galaxy field (URLs inside `bg-video-v9.html`). #5 robot field = most on-palette (dark blue + AI story).

**Demo files (all in `public/`, open via dev server):**
- `bg-video-v13.html` — ★ **CURRENT (2026-07-06): three-act story** — ☁ cliff coder (hero+about) → motion DIVE at ~0.40 (About→Skills) → 🌐 digital-flight bridge (Skills; uses cliff-take1's own blue light-pillar tail, video 0.87–1.0) → **PORTAL ARRIVAL** at ~0.60 (chip appears as a glowing feathered circle ahead and grows until it fills the screen — offscreen-canvas radial mask + glow ring) → 🔷 chip board (projects+contact, bg-circuit.mp4). Portal verified visually, looks great. **USER VERDICT PENDING — last words "idk, we can talk more". Resume: user scrolls/records v13 and reacts.**
- `bg-video-v11.html` — single-video fallback (cliff-take1 only). Its dive mechanic (rush-out + zoom-streaks + light blue wash ≤0.30 — NO flat color card) is **USER-APPROVED** ("ok this is good"); v13 reuses it for dive 1.
- `bg-video-v12.html` — cliff → chip DIRECT jump. REJECTED ("transition looks awkward, need something in between") → led to v13's bridge.
- `bg-video-v10.html` — old stitched two-act with dark-blink seam. REJECTED earlier.
- `bg-video-v8.html` — chip-only scrub. Backup. `bg-video-v9.html?v=2|5|8|9|chip` — motionsites picks switcher.
- Tools: `video-frames.html?src=/x.mp4&n=16` — frame-sheet for ANY video (also used to review user's screen recordings). `bg-candidates.html` — motionsites contact sheet.
- `hero-liquid-glass.html` — Velorah-style template (looping coders-under-stars video, liquid-glass UI, Instrument Serif). Built, personalized; NO VERDICT from user yet. Forces a serif-vs-bold typography decision if chosen.
- `bg-video-scrub.html` — original Veldara template copy. Older: bg-demo/bg-3d*.html = dead 3D-object era.

**Transition design rules learned from user feedback (IMPORTANT — carry into any future transition):**
1. NO flat color card ("blue screen") — always real imagery on screen; motion sells the cut (rush-out with zoom-streaks, or a growing portal).
2. Transitions land on SECTION BOUNDARIES, never mid-section (dive 1 ≈ 0.40 About→Skills; arrival ≈ 0.60 Skills→Projects).
3. Skip bad source frames via the non-linear time map (cliff-take1: white laptop screen ≈ video 0.47–0.86; grass-bottom frames before 0.86).
4. Worlds must CONNECT — one scale level per hop (clouds → cyberspace → silicon). Direct cliff→chip was rejected as "2 different things".
5. Wide cliff shot gets a slow burn (map node [0.30 scroll → 0.30 video] keeps hero+About wide).

**Feedback loop that works:** user records screen (Snipping Tool → `C:\Users\imayu\AppData\Local\Packages\Microsoft.ScreenSketch_*\TempState\Recordings\*.mp4`), I `cp` it to `public/screen-recN.mp4`, then review via `video-frames.html?src=/screen-recN.mp4&n=16` + one screenshot. (screen-rec1/2.mp4 are junk — prune with demos before deploy.)

**Improved Kling prompt (v2, beats-based)**: in chat history; key fixes = laptop screen must DISPLAY the glowing blue circuit world (so dive is continuous), 10s duration option, no text on screen. Generators frustrated the user ("these sites are not good") — the salvage path (code covers seams) is the pragmatic answer.

## Next steps when user returns
1. User scrolls/records `bg-video-v13.html` (three-act: cliff → digital flight → portal → chip) → verdict on the portal arrival + overall story.
2. Tunables if close: portal growth speed/size, D2 position/width, flight-segment length, dive-1 feel.
3. If v13 wins → integrate the scrub engine into the React app (replace ParticlesBackground; prefers-reduced-motion → static poster; mobile fallback; keep videos local in public/).
4. If not → v11 (approved dive, single video) and v8 (chip only) are ready fallbacks; or generate a better take with the v2 Kling prompt (10s, screen shows blue circuits).
5. Also pending: liquid-glass hero verdict; prune public/ junk before ANY deploy; then the cricket side.

## Tech/workflow quirks
- User's dev server: 5173 (`npm run dev`). Preview tool runs its own Vite on **5180** (`.claude/launch.json`, strictPort). Both serve `public/` demos.
- Preview tool's screenshot chokes on video-heavy pages → use Chrome (claude-in-chrome) for viewing video demos. User must have Chrome open for that.
- `public/` ships on deploy — before any `npm run deploy`, prune demo html/mp4 junk or move it out.
- Palette: bg `#05030f`, electric blue `#3b82f6` (now the main accent: Patel, SE title, menu numbers), old gradient `#60a5fa→#a78bfa→#f472b6` mostly retired from hero.
