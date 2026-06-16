# Portfolio Ideas & Progress

## ✅ Done So Far

- **Preloader** — "AYUSH PATEL" letters animate down one by one, blue line draws underneath, "PORTFOLIO" fades in
- **Massive hero text** — name uses `clamp()` so it scales with the screen, "Patel" in electric blue
- **Custom cursor** — invert blend-mode (white filled blob + dot, mix-blend-mode: difference) — inverts whatever is behind it
- **Electric blue accent** (`#3b82f6`) — used on labels, hover states, buttons throughout
- **Space Grotesk font** — replaced the old custom fonts, cleaner and more premium feel
- **Lenis smooth scroll** — whole page has momentum/glide scroll like the reference sites
- **Horizontal project showcase** — Projects section pins while you scroll; each project slides in from the right. Ghost number behind title, pill progress dots at bottom, progress bar fades out at end
- **Fixed particles background** — stars stay behind all sections
- **Footer** — added at bottom of contact
- **Contact form** — cleaned up, no stray "Thank you." text
- **Word reveal on headings** — blur+scale animation (blurs in from slightly enlarged+blurry to crisp), replays every scroll in/out (`once: false`)
- **Parallax on all sections** — hero name lags at 0.35x speed (direct style.transform in Lenis RAF)
- **Tech stack tags on projects** — blue pill tags under each project (React, Python, etc.)
- **Scroll-driven animations** — labels slide in from left, paragraph text fades up, skill cards stagger in. All replay on scroll in/out
- **Projects label fixed** — "WHAT I'VE BUILT" label pushed below navbar (`top-16`)
- **Progress bar fade** — progress bar fades out as you exit the last project
- **Text scramble on hero name** — "Ayush Patel" scrambles through random chars before resolving. 38ms × 7 steps ≈ 1.3s. Re-triggers every time you scroll back to hero (`once: false`)
- **Magnetic buttons** — buttons spring-pull toward cursor with Framer Motion useSpring (stiffness 400, damping 28)

---

## ❌ Tried But Didn't Like

- **Full-site horizontal scroll** — made the whole site slide horizontally. Felt disconnected, undone.
- **Vertical sticky project cards** — projects used to fade in/out. Replaced with horizontal slide.
- **Marquee ticker** — removed, felt redundant since Skills section already shows the stack
- **Cursor ring-only style** — user wanted the filled blob back, not just an outline ring
- **Cursor comet trail** — tried this, user didn't like it

---

## 🎯 NEXT SESSION — Top Priority

### 1. Background Animation (PICK ONE — user likes these 3)
These need to be applied to the whole site, replacing the current static star particles in `ParticlesBackground.jsx`:
- **Flow Field** — particles follow a noise vector field, blue/violet hue-shifted trails
- **Topo Lines** — contour/topographic lines slowly drifting, blue-to-violet gradient
- **Circuit Traces** — animated circuit board traces with glowing endpoints (green accent)

User said they also like **Crimson Dark** color theme (near-black + red accent) but mainly uses **B Extended** (dark purple-black background + blue→violet→pink animated gradient on "Patel" name).

### 2. Color Theme (apply after picking background)
Options discussed:
- **B Extended** (preferred) — dark purple-black bg, "Patel" name gets animated gradient: blue → violet → pink → loop. All blue accents shift to blue-violet.
- **Crimson Dark** — near black + red (`#f87171`) accent replacing electric blue. Edgier look.
- Keep current electric blue — safest option, already deployed

### 3. Remaining Polish
- [ ] **Nav hover effect** — showed options before, none felt right. Revisit.
- [ ] **Floating contact form labels** — labels animate up when you type
- [ ] **Contact form loading + success states** — spinner on submit, success message
- [ ] **About text width** — cap to ~65 chars per line for readability
- [ ] **Mobile responsive pass** — horizontal scroll needs fallback for phones
- [ ] **SEO meta tags** — title, description, og:image in index.html
- [ ] **About section photo** — not ready yet
- [ ] **Add more projects** — currently only 3

---

## 🔑 Notes & Keywords

- **Restore keyword**: say **"go back to my default"** to revert to pre-redesign site (backup saved as `App.backup.jsx`)
- Dev server: `cd /d D:\School\my-portfolio` then `npm run dev` → http://localhost:5173/My_Portfolio/
- **Deploy commands** (run from Windows terminal in `D:\School\my-portfolio`):
  ```
  git add . && git commit -m "your message" && git push
  npm run deploy
  ```
- Live site: https://ayushpatel2803.github.io/My_Portfolio/
- Reference sites: sidewave.it, igloo.inc, opalcamera.com/opal-tadpole, everswap.com, juanmora.co
- Parallax uses direct `style.transform` (not Framer Motion useScroll) — they don't sync with Lenis
- Contact form only works on deployed site (formsubmit.co), not localhost
- Scramble uses `heroSectionRef` + `useInView(once:false)` to re-trigger on scroll back to hero
- Canvas animations for bg: use `setTimeout(init, 300)` not `window.load` — load event already fired in widget context
