import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ParticlesBackground from "./ParticlesBackground";
import { SiGooglecolab } from "react-icons/si";

const projects = [
  {
    title: "Enchanted Wars",
    desc: "React frontend for a 1v1 card game—Find Match, Local Game, responsive design, UI animations.",
    image: "/images/enchanted-wars.png",
    link: "https://github.com/AyushPatel2803/EnchantedWars",
  },
  {
    title: "RSNA 2024 Spine ML",
    desc: "Python/OpenCV pipelines & ML models to classify lumbar spine degeneration.",
    image: "/images/rsna-spine.png",
    link: "https://github.com/iamayushpatel03/rsna-spine",
  },
  {
    title: "SplitSmart: Expense Mgmt",
    desc: "Full-stack expense splitter with UML diagrams, requirements, and deployment design.",
    image: "/images/splitsmart.png",
    link: "https://github.com/iamayushpatel03/splitsmart",
  },
];

export default function App() {
  const [activeIdx, setActiveIdx] = useState(0);

  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const referrer = document.referrer;

    if (hash === "#thankyou" && referrer.includes("formsubmit.co")) {
      setShowThankYou(true);
      const thankyouSection = document.getElementById("thankyou");
      if (thankyouSection) {
        thankyouSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <div className="relative font-sans text-gray-800">
      <div className="absolute inset-0 -z-10">
        <ParticlesBackground />
      </div>
      {/* NAVBAR */}
      <nav className="fixed w-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg border-b border-white/10 text-white z-10 shadow-[inset_0_1px_3px_rgba(255,255,255,0.1)]">
        <ul className="container mx-auto flex justify-center space-x-8 py-4">
          {["Home", "About", "Skills", "Projects", "Contact"].map((section) => (
            <li key={section}>
              <a
                href={`#${section.toLowerCase()}`}
                className="hover:text-blue-600 transition-colors"
              >
                {section}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO / HOME */}
      <section
        id="home"
        className="h-screen flex items-center justify-center pt-16"
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-6xl font-bold mb-4 text-white">
            Hello, I’m Ayush Patel
          </h1>
          <p className="mb-6 text-lg text-teal-300">BS in Computer Science</p>
          <div className="flex justify-center items-center space-x-4 text-2xl mt-4">
            <a
              href="https://github.com/AyushPatel2803"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white hover:text-teal-300 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/iamayushpatel03"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white hover:text-teal-300 transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </section>
      <section id="about" className="py-20 px-6 max-w-3xl mx-auto text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-extrabold mb-6 tracking-wide">About Me</h2>
          <p className="text-lg leading-relaxed">
            I’m a recent Computer Science graduate from the University of
            Michigan–Dearborn. I love building frontend applications with React,
            solving problems in Python, and designing clear system architectures
            with UML. In past projects, I’ve led frontend development,
            orchestrated data preprocessing pipelines for medical imaging, and
            documented full software requirements.
          </p>
        </motion.div>
      </section>
      {/* SKILLS */}
      <section id="skills" className="bg-transparent-100 py-20 px-6">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-extrabold mb-12 text-white tracking-wide">
            Skills
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "JavaScript",
              "React",
              "Python",
              "Tailwind CSS",
              "Framer Motion",
              "UML Modeling",
              "Git & GitHub",
              "OpenCV",
              "Matplotlib",
            ].map((skill) => (
              <li
                key={skill}
                className="bg-white/10 backdrop-blur-sm text-white rounded-lg shadow-md p-4 text-center font-medium hover:bg-white/20 transition-colors"
              >
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
      {/* PROJECTS */}
      <section id="projects" className="py-16 px-6 bg-transparent">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-5xl font-extrabold mb-12 text-white tracking-wide">
            Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
            {[
              {
                title: "Enchanted Wars",
                desc: "React frontend for a 1v1 card game—Find Match, Local Game, responsive design, UI animations.",
                link: "https://github.com/AyushPatel2803/EnchantedWars",
              },
              {
                title: "RSNA 2024 Spine ML",
                desc: "Python/OpenCV pipelines & ML models to classify lumbar spine degeneration.",
                link: "https://colab.research.google.com/drive/10dmeiqPDFg1CY6UlL9j1Hke2VwbK7Ktt?usp=sharing",
              },
              {
                title: "SplitSmart: Expense Management",
                desc: "Full-stack expense splitter with UML diagrams, requirements, and deployment design.",
                link: "https://github.com/iamayushpatel03/splitsmart",
              },
            ].map((p) => (
              <motion.div
                key={p.title}
                className="bg-white/10 backdrop-blur-md text-white rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:-translate-y-2 hover:bg-white/20 shadow-xl"
              >
                <h3 className="text-xl font-bold mb-2 whitespace-normal break-words">
                  {p.title}
                </h3>
                <p className="text-sm mb-4">{p.desc}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-300 hover:underline"
                >
                  {p.link.includes("colab") ? (
                    <>
                      <SiGooglecolab className="mr-2" /> View on Colab
                    </>
                  ) : (
                    <>
                      <FaGithub className="mr-2" /> View on GitHub
                    </>
                  )}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 bg-transparent">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-5xl font-extrabold mb-8 text-white tracking-wide">
            Contact
          </h2>
          <p className="text-white mb-10">
            I’d love to hear about your next project or opportunity — feel free to drop me a message!
          </p>

          <form
            action="https://formsubmit.co/imayushpatel28@gmail.com"
            method="POST"
            className="grid gap-4"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_next"
              value="https://ayushpatel2803.github.io/My_Portfolio/#home"
            />

            <input
              type="text"
              name="Name"
              placeholder="Your Name"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded p-2 w-full placeholder:text-white/70"
              required
            />
            <input
              type="email"
              name="Email"
              placeholder="Your Email"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded p-2 w-full placeholder:text-white/70"
              required
            />
            <textarea
              name="Message"
              rows="4"
              placeholder="Your Message"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded p-2 w-full placeholder:text-white/70"
              required
            />
            <button
              type="submit"
              className="mx-auto bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 rounded transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </section>
      {/* FOOTER */}
      <footer className="tex