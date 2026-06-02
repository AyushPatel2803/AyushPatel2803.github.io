# Portfolio Ideas & Progress

## ✅ Done So Far

- **Preloader** — "AYUSH PATEL" letters animate down one by one, blue line draws underneath, "PORTFOLIO" fades in
- **Massive hero text** — name uses `clamp()` so it scales with the screen, "Patel" in electric blue
- **Custom cursor** — blue ring that follows the mouse, expands when hovering links/buttons
- **Electric blue accent** (`#3b82f6`) — used on labels, hover states, buttons, and the cursor throughout
- **Space Grotesk font** — replaced the old custom fonts, cleaner and more premium feel
- **Lenis smooth scroll** — whole page has momentum/glide scroll like the reference sites
- **Horizontal project showcase** — Projects section pins while you scroll; each project slides in from the right. Ghost number behind title, pill progress dots at bottom, progress bar fades out at end
- **Fixed particles background** — stars stay behind all sections
- **Footer** — added at bottom of contact
- **Contact form** — cleaned up, no stray "Thank you." text
- **Word reveal on headings** — "About Me", "Skills", "Contact" slide up word-by-word on scroll in. Replays every time (`once: false`)
- **Parallax on all sections** — hero name lags at 0.35x speed (direct style.transform in Lenis RAF). About/Skills/Contact content floats via scroll event + getBoundingClientRect
- **Tech stack tags on projects** — blue pill tags under each project (React, Python, etc.)
- **Scroll-driven animations** — labels slide in from left, paragraph text fades up, skill cards stagger in one by one. All replay on scroll in/out
- **Projects label fixed** — "WHAT I'VE BUILT" label pushed below navbar (`top-16`)
- **Progress bar fade** — progress bar fades out as you exit the last project

---

## ❌ Tried But Didn't Like

- **Full-site horizontal scroll** — made the whole site slide horizontally. Felt disconnected, undone.
- **Vertical sticky project cards** — projects used to fade in/out. Replaced with horizontal slide.
- **Marquee ticker** — removed, felt redundant since Skills section already shows the stack

---

## 💡 Still Left To Do

### In Progress / Deciding
- [ ] **Nav hover effect** — showed 6 options (roll blue, roll bold, dot, underline center, glow, strikethrough), none felt right. You want something that feels uniquely yours. No direction yet — come back to this.

### Design & Interactions
- [ ] **Micro-interactions** — small hover/interaction details (button arrow animation, etc.)
- [ ] **About section photo** — you have a plan for this, not ready yet
- [ ] **Dark/light mode toggle** — optional, keep dark as default

### Polish
- [ ] **Mobile responsive pass** — horizontal scroll needs a fallback for phones
- [ ] **SEO meta tags** — add title, description, og:image to index.html for sharing/search

### Content
- [ ] **Add more projects** — currently only 3
- [ ] **Project preview images** — screenshots/mockups alongside project titles (holding)

### Deployment
- [ ] Run `git add . && git commit -m "message" && git push` from Windows terminal
- [ ] Run `npm run deploy` to push to GitHub Pages
- [ ] Live site: https://ayushpatel2803.github.io/My_Portfolio/

---

## 🔑 Notes

- **Restore keyword**: say **"go back to my default"** to undo everything back to the original pre-redesign site
- Dev server: `cd /d D:\School\my-portfolio` then `npm run dev` → opens at http://localhost:5173/My_Portfolio/
- Reference sites: sidewave.it, igloo.inc, opalcamera.com/opal-tadpole, everswap.com, juanmora.co
- Parallax uses direct `style.transform` (not Framer Motion useScroll) — Lenis and Framer Motion's useScroll don't sync well
- Contact form only works on deployed site (formsubmit.co), not localhost
