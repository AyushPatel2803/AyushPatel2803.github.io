import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ParticlesBackground from "./ParticlesBackground";
import { SiGooglecolab } from "react-icons/si";
import Lenis from "lenis";

// ── MOBILE DETECTION HOOK ─────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ── SCRAMBLE HERO TEXT ─────────────────────────────────────────
function ScrambleHero({ trigger }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  const [display1, setDisplay1] = useState('Ayush');
  const [display2, setDisplay2] = useState('Patel');
  const running = useRef(false);

  useEffect(() => {
    if (!trigger || running.current) return;
    running.current = true;

    function scramble(target, setter, onDone) {
      let iter = 0;
      const total = target.length * 7;
      const iv = setInterval(() => {
        setter(
          target.split('').map((c, i) =>
            i < Math.floor(iter / 7) ? c : chars[Math.floor(Math.random() * chars.length)]
          ).join('')
        );
        if (iter >= total) {
          setter(target);
          clearInterval(iv);
          if (onDone) onDone();
        }
        iter++;
      }, 38);
    }

    const t = setTimeout(() => {
      scramble('Ayush', setDisplay1);
      scramble('Patel', setDisplay2, () => { running.current = false; });
    }, 200);

    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <>
      {display1} <span className="text-blue-500">{display2}</span>
    </>
  );
}

// ── CUSTOM CURSOR (INVERT BLEND) ──────────────────────────────
function CustomCursor() {
  const isMobile = useIsMobile();
  const blobRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const smoothPos = useRef({ x: -200, y: -200 });
  const targetSize = useRef(44);
  const currentSize = useRef(44);
  const rafRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el && el.closest("a, button, [role='button'], input, textarea, select");
      targetSize.current = interactive ? 64 : 44;
    };

    const onDown = () => { targetSize.current = 32; };
    const onUp = () => {
      const el = document.elementFromPoint(mouse.current.x, mouse.current.y);
      const interactive = el && el.closest("a, button, [role='button'], input, textarea, select");
      targetSize.current = interactive ? 64 : 44;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    function animate() {
      smoothPos.current.x += (mouse.current.x - smoothPos.current.x) * 0.11;
      smoothPos.current.y += (mouse.current.y - smoothPos.current.y) * 0.11;
      currentSize.current += (targetSize.current - currentSize.current) * 0.1;

      const s = currentSize.current;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${smoothPos.current.x - s / 2}px, ${smoothPos.current.y - s / 2}px)`;
        blobRef.current.style.width = s + "px";
        blobRef.current.style.height = s + "px";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Invert blob — lags behind, mix-blend-mode inverts content underneath */}
      <div
        ref={blobRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: 44, height: 44,
          background: "#ffffff",
          mixBlendMode: "difference",
          zIndex: 9998,
          willChange: "transform, width, height",
        }}
      />
      {/* Dot — snaps instantly to exact cursor position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: 6, height: 6,
          background: "#ffffff",
          mixBlendMode: "difference",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
    </>
  );
}

// ── PRELOADER ──────────────────────────────────────────────────
function Preloader({ onDone }) {
  const letters = "AYUSH PATEL".split("");
  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="flex overflow-hidden mb-4">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className={`text-5xl font-extrabold tracking-widest ${l === " " ? "w-6" : "text-white"}`}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="h-px bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
        onAnimationComplete={onDone}
      />
      <motion.p
        className="text-white/40 text-sm mt-4 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Portfolio
      </motion.p>
    </motion.div>
  );
}

// ── WORD REVEAL (blur + scale) ─────────────────────────────────
function WordReveal({ text, className, style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.h2
      ref={ref}
      className={className}
      style={style}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }
          : { opacity: 0, filter: "blur(14px)", scale: 1.05, y: 6 }
      }
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.h2>
  );
}

// ── PARALLAX SECTION WRAPPER ───────────────────────────────────
function ParallaxSection({ children, strength = 80 }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      if (ref.current) ref.current.style.transform = "none";
      return;
    }
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerOffset = (rect.top + rect.height / 2) / window.innerHeight - 0.5;
      ref.current.style.transform = `translateY(${centerOffset * -strength}px)`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [strength, isMobile]);

  return <div ref={ref}>{children}</div>;
}

// ── MAGNETIC BUTTON WRAPPER ────────────────────────────────────
function MagneticButton({ children, style, className }) {
  const ref = useRef(null);
  const xVal = useMotionValue(0);
  const yVal = useMotionValue(0);
  const x = useSpring(xVal, { stiffness: 400, damping: 28 });
  const y = useSpring(yVal, { stiffness: 400, damping: 28 });

  function onMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    xVal.set(dx * 0.38);
    yVal.set(dy * 0.38);
  }

  function onMouseLeave() {
    xVal.set(0);
    yVal.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block", ...style }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// ── HORIZONTAL PROJECTS SHOWCASE ───────────────────────────────
function ProjectsShowcase({ projects }) {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const [winW, setWinW] = useState(window.innerWidth);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -(projects.length - 1) * winW]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActiveIndex(Math.min(Math.floor(v * projects.length), projects.length - 1));
    });
  }, [scrollYProgress, projects.length]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  // Mobile: vertical cards
  if (isMobile) {
    return (
      <section id="projects" className="py-16 px-6">
        <div className="mb-10">
          <span className="text-blue-500 text-xs font-mono tracking-widest uppercase">What I've built</span>
        </div>
        <div className="flex flex-col gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, margin: "-40px" }}
            >
              <div className="font-extrabold leading-none select-none mb-2"
                style={{ fontSize: "clamp(4rem, 20vw, 8rem)", color: "rgba(255,255,255,0.04)" }}>
                0{i + 1}
              </div>
              <h2 className="font-extrabold tracking-tight leading-none mb-4"
                style={{ fontSize: "clamp(1.8rem, 7vw, 3rem)", marginTop: "-2rem", position: "relative", zIndex: 1 }}>
                {project.title}
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-4">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full border border-blue-500/40 text-blue-400"
                    style={{ background: "rgba(59,130,246,0.08)" }}>{tag}</span>
                ))}
              </div>
              <MagneticButton>
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-blue-500/60 text-blue-400 px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">
                  {project.link.includes("colab") ? <SiGooglecolab size={14} /> : <FaGithub size={14} />}
                  {project.link.includes("colab") ? "View on Google Colab" : "View on GitHub"}
                </a>
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={ref} style={{ height: `${projects.length * 150}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden relative">

        {/* Top label + counter */}
        <div className="absolute top-16 left-16 z-10 flex items-center gap-5">
          <span className="text-blue-500 text-xs font-mono tracking-widest uppercase">What I've built</span>
          <div className="w-12 h-px bg-white/20" />
          <span className="text-white/30 font-mono text-xs">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x, display: "flex", width: `${projects.length * 100}vw`, height: "100%" }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="flex-shrink-0 flex items-center px-20 justify-between"
              style={{ width: "100vw", height: "100%" }}
            >
              <div className="text-white" style={{ maxWidth: "55vw" }}>
                <h2
                  className="font-extrabold tracking-tight leading-none mb-6 relative z-10"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
                >
                  {project.title}
                </h2>
                <p className="text-white/55 text-lg leading-relaxed mb-4 max-w-xl">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full border border-blue-500/40 text-blue-400 bg-blue-500/8"
                      style={{ background: "rgba(59,130,246,0.08)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <MagneticButton>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-btn inline-flex items-center gap-3 border border-blue-500/60 text-blue-400 px-8 py-4 rounded-full font-medium text-sm tracking-wide"
                  >
                    {project.link.includes("colab") ? <SiGooglecolab size={16} /> : <FaGithub size={16} />}
                    <span className="proj-btn-text" style={{ display: "flex", flexDirection: "column", height: "1.2em", overflow: "hidden" }}>
                      <span style={{ transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
                        {project.link.includes("colab") ? "View on Google Colab" : "View on GitHub"}
                      </span>
                      <span style={{ transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
                        {project.link.includes("colab") ? "View on Google Colab" : "View on GitHub"}
                      </span>
                    </span>
                  </a>
                </MagneticButton>
              </div>
              {/* Right side — large decorative number */}
              <div
                className="font-extrabold leading-none select-none flex-shrink-0"
                style={{ fontSize: "clamp(10rem, 22vw, 20rem)", color: "rgba(255,255,255,0.03)", marginRight: "4rem" }}
              >
                0{i + 1}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress bar — pinned to bottom of sticky viewport */}
        <motion.div className="absolute bottom-10 left-20 right-20" style={{ opacity: progressOpacity }}>
          <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
            <motion.div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" style={{ width: progressWidth }} />
          </div>
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {projects.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                height: 6,
                width: i === activeIndex ? 28 : 6,
                background: i === activeIndex ? "#3b82f6" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CAPABILITIES SECTION ──────────────────────────────────────
function CapabilitiesSection({ scrollToProject, isMobile }) {
  const [activeIdx, setActiveIdx] = useState(-1);

  const capabilities = [
    {
      label: "Interfaces",
      bigWord: "Frontend.",
      title: "Build interfaces that move",
      desc: "React, Tailwind, Framer Motion — animated, responsive web experiences.",
      projectName: "Enchanted Wars",
      projectIdx: 1,
    },
    {
      label: "Models",
      bigWord: "Machine\nLearning.",
      title: "Train models that fit anywhere",
      desc: "PyTorch, LoRA/QLoRA, Hugging Face — 7B-param LLMs on a 6 GB GPU, fully offline.",
      projectName: "PyExplain",
      projectIdx: 0,
    },
    {
      label: "Systems",
      bigWord: "Full-Stack.",
      title: "Design systems that scale",
      desc: "Java, UML, full-stack architecture — software that makes sense from day one.",
      projectName: "SplitSmart",
      projectIdx: 3,
    },
  ];

  return (
    <section id="skills" className="py-24 px-16 md:px-24">
      <ParallaxSection>
        <div>
          <motion.span
            className="text-blue-500 text-xs font-mono tracking-widest uppercase mb-10 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, margin: "-60px" }}
          >What I build</motion.span>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "2rem" : "4rem",
            alignItems: "start",
          }}>
            {/* Left — big words */}
            {!isMobile && (
              <div style={{ paddingTop: "4px" }}>
                {capabilities.map((cap, i) => (
                  <span
                    key={i}
                    onMouseEnter={() => setActiveIdx(i)}
                    onMouseLeave={() => setActiveIdx(-1)}
                    style={{
                      display: "block",
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      letterSpacing: "-0.025em",
                      color: activeIdx === i ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.15)",
                      transition: "color 0.25s ease",
                      marginBottom: "0.3em",
                      whiteSpace: "pre-line",
                      cursor: "default",
                    }}
                  >
                    {cap.bigWord}
                  </span>
                ))}
              </div>
            )}

            {/* Right — rows */}
            <div>
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(-1)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: false, margin: "-60px" }}
                  style={{
                    padding: "22px 0",
                    borderTop: "0.5px solid rgba(255,255,255,0.06)",
                    borderBottom: i === capabilities.length - 1 ? "0.5px solid rgba(255,255,255,0.06)" : "none",
                    paddingLeft: activeIdx === i ? "16px" : "0",
                    transition: "padding-left 0.3s cubic-bezier(0.22,1,0.36,1)",
                    position: "relative",
                    cursor: "default",
                  }}
                >
                  {/* Blue left bar */}
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
                    background: "#3b82f6",
                    transform: activeIdx === i ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "top",
                    transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                    borderRadius: 2,
                  }} />

                  {/* Label */}
                  <p style={{
                    fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: activeIdx === i ? "#3b82f6" : "rgba(255,255,255,0.18)",
                    marginBottom: 6, transition: "color 0.25s", fontWeight: 500,
                  }}>{cap.label}</p>

                  {/* Title */}
                  <span style={{
                    fontSize: 15, fontWeight: 600, display: "block",
                    color: activeIdx === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                    transition: "color 0.25s",
                    marginBottom: activeIdx === i ? 6 : 0,
                  }}>{cap.title}</span>

                  {/* Description — expands on hover */}
                  <p style={{
                    fontSize: 12, lineHeight: 1.65,
                    color: "rgba(255,255,255,0.38)",
                    maxHeight: activeIdx === i ? "80px" : "0",
                    opacity: activeIdx === i ? 1 : 0,
                    overflow: "hidden",
                    marginBottom: activeIdx === i ? 12 : 0,
                    transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s, margin-bottom 0.3s",
                  }}>{cap.desc}</p>

                  {/* See project button — appears on hover */}
                  <button
                    onClick={() => scrollToProject(cap.projectIdx)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
                      color: "#3b82f6",
                      background: "transparent",
                      border: "0.5px solid rgba(59,130,246,0.35)",
                      borderRadius: 100,
                      padding: "6px 14px",
                      cursor: "pointer",
                      maxHeight: activeIdx === i ? "40px" : "0",
                      opacity: activeIdx === i ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s, background 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; e.currentTarget.style.borderColor = "#3b82f6"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.35)"; }}
                  >
                    See {cap.projectName} <span style={{ transition: "transform 0.2s", display: "inline-block" }}>→</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const heroContentRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroInView = useInView(heroSectionRef, { once: false, margin: "-20%" });
  const lenisRef = useRef(null);
  const isMobile = useIsMobile();

  // Lenis smooth scroll + hero parallax updated every frame
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    let raf;
    function tick(time) {
      lenis.raf(time);
      if (heroContentRef.current) {
        if (window.innerWidth > 768) {
          heroContentRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        } else {
          heroContentRef.current.style.transform = "none";
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  function scrollToProject(index) {
    const section = document.getElementById("projects");
    if (!section) return;

    if (isMobile) {
      // On mobile, projects are vertical — scroll to the section
      if (lenisRef.current) {
        lenisRef.current.scrollTo(section, { offset: -80, duration: 1.4 });
      }
      return;
    }

    // Desktop: calculate exact scroll position for the horizontal track
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const progress = projects.length > 1 ? index / (projects.length - 1) : 0;
    const targetScrollY = sectionTop + progress * (sectionHeight - windowHeight);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScrollY, {
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  }

  // projects defined here so scrollToProject can reference it
  const projects = [
    {
      title: "PyExplain",
      desc: "Fine-tuned Qwen2.5-Coder with LoRA/QLoRA and 4-bit quantization to run a 7B model on a 6 GB GPU — full data→train→inference pipeline, runs fully offline.",
      link: "https://github.com/AyushPatel2803/PyExplain",
      tags: ["Python", "PyTorch", "Hugging Face", "LoRA/QLoRA", "LLMs"],
    },
    {
      title: "Enchanted Wars",
      desc: "React frontend for a 1v1 card game — Find Match, Local Game, responsive design, UI animations.",
      link: "https://github.com/AyushPatel2803/EnchantedWars",
      tags: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "RSNA 2024 Spine ML",
      desc: "Python/OpenCV pipelines & ML models to classify lumbar spine degeneration.",
      link: "https://colab.research.google.com/drive/10dmeiqPDFg1CY6UlL9j1Hke2VwbK7Ktt?usp=sharing",
      tags: ["Python", "OpenCV", "Matplotlib", "Machine Learning"],
    },
    {
      title: "SplitSmart: Expense Management",
      desc: "Full-stack expense splitter with UML diagrams, requirements, and deployment design.",
      link: "https://github.com/iamayushpatel03/splitsmart",
      tags: ["Java", "UML", "Full-Stack", "Software Design"],
    },
  ];

  return (
    <>
      <style>{`
        @media (pointer: fine) { *, *:hover { cursor: none !important; } }
        .nav-link { color: rgba(255,255,255,0.35); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; transition: color 0.3s ease, letter-spacing 0.4s cubic-bezier(0.22,1,0.36,1); text-decoration: none; }
        .nav-list:hover .nav-link { color: rgba(59,130,246,0.25); }
        .nav-list:hover .nav-link:hover { color: #fff !important; letter-spacing: 0.18em; }
        .proj-btn { transition: background 0.3s, color 0.3s, border-color 0.3s; }
        .proj-btn:hover { background: #3b82f6; color: #fff; border-color: #3b82f6; }
        .proj-btn:hover .proj-btn-text span { transform: translateY(-100%); }
        .social-link { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; border: 0.5px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.5); font-size: 18px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .social-link:hover { color: #fff !important; border-color: #3b82f6; background: rgba(59,130,246,0.15); transform: translateY(-5px) scale(1.1) rotate(8deg); box-shadow: 0 8px 24px rgba(59,130,246,0.35); }
      `}</style>
      <CustomCursor />

      <AnimatePresence>
        {loading && <Preloader onDone={() => setTimeout(() => setLoading(false), 400)} />}
      </AnimatePresence>

      <div className="relative font-sans text-gray-800">
        <div className="fixed inset-0 -z-10">
          <ParticlesBackground />
        </div>

        {/* NAVBAR */}
        <nav className="fixed w-full bg-gradient-to-b from-black/40 to-black/10 backdrop-blur-lg border-b border-white/10 text-white z-10">
          <ul className="nav-list container mx-auto flex justify-center space-x-4 md:space-x-8 py-4">
            {["Home","About","Skills","Projects","Contact"].map((section) => (
              <li key={section}>
                <a href={`#${section.toLowerCase()}`} className="nav-link">
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* HERO */}
        <section id="home" className="h-screen flex flex-col items-center justify-center pt-16 px-4" ref={heroSectionRef}>
          <div ref={heroContentRef} className="text-center w-full">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1
              className="font-extrabold text-white leading-none tracking-tighter mb-6"
              style={{ fontSize: "clamp(3rem, 10vw, 9rem)", fontFamily: "inherit" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0 : 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <ScrambleHero trigger={!loading && heroInView} />
            </motion.h1>
            <motion.p
              className="text-white/50 text-lg tracking-widest uppercase mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0 : 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              BS in Computer Science
            </motion.p>
            <motion.div
              className="flex justify-center items-center space-x-6 text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0 : 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <a href="https://github.com/AyushPatel2803" target="_blank" rel="noopener noreferrer"
                className="social-link text-white/50"><FaGithub /></a>
              <a href="https://linkedin.com/in/iamayushpatel03" target="_blank" rel="noopener noreferrer"
                className="social-link text-white/50"><FaLinkedin /></a>
            </motion.div>
          </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 px-6 max-w-4xl mx-auto text-white">
          <ParallaxSection>
            <motion.span
              className="text-blue-500 text-xs font-mono tracking-widest uppercase mb-4 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: false, margin: "-60px" }}
            >Who I am</motion.span>
            <WordReveal text="About Me" className="font-extrabold mb-8 tracking-tight text-white" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }} />
            <motion.p
              className="text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: false, margin: "-60px" }}
            >
              I'm a recent Computer Science graduate from the University of Michigan–Dearborn.
              I love building frontend applications with React, solving problems in Python, and
              designing clear system architectures with UML. In past projects, I've led frontend
              development, orchestrated data preprocessing pipelines for medical imaging, and
              documented full software requirements.
            </motion.p>
          </ParallaxSection>
        </section>

        {/* SKILLS / CAPABILITIES */}
        <CapabilitiesSection scrollToProject={scrollToProject} isMobile={isMobile} />

        {/* PROJECTS — horizontal scroll showcase */}
        <ProjectsShowcase projects={projects} />

        {/* CONTACT */}
        <section id="contact" className="py-24 px-6">
          <ParallaxSection strength={40}>
          <div className="max-w-2xl mx-auto text-center">
            <motion.span
              className="text-blue-500 text-xs font-mono tracking-widest uppercase mb-4 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: false, margin: "-60px" }}
            >Get in touch</motion.span>
            <WordReveal text="Contact" className="font-extrabold mb-6 text-white tracking-tight" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }} />
            <motion.p
              className="text-white/60 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: false, margin: "-60px" }}
            >
              I'd love to hear about your next project or opportunity — feel free to drop me a message!
            </motion.p>
            <form action="https://formsubmit.co/imayushpatel28@gmail.com" method="POST" className="grid gap-4">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://ayushpatel2803.github.io/#home" />
              <input type="text" name="Name" placeholder="Your Name"
                className="bg-white/5 border border-white/10 focus:border-blue-500 text-white rounded-lg p-3 w-full placeholder:text-white/30 outline-none transition-colors" required />
              <input type="email" name="Email" placeholder="Your Email"
                className="bg-white/5 border border-white/10 focus:border-blue-500 text-white rounded-lg p-3 w-full placeholder:text-white/30 outline-none transition-colors" required />
              <textarea name="Message" rows="4" placeholder="Your Message"
                className="bg-white/5 border border-white/10 focus:border-blue-500 text-white rounded-lg p-3 w-full placeholder:text-white/30 outline-none transition-colors" required />
              <MagneticButton style={{ display: "flex", justifyContent: "center" }}>
                <button type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg transition-colors font-medium tracking-wide">
                  Send Message →
                </button>
              </MagneticButton>
            </form>
          </div>
          </ParallaxSection>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-6 text-white/20 text-sm border-t border-white/5">
          © 2025 Ayush Patel · Built with React & Tailwind CSS
        </footer>
      </div>
    </>
  );
}
