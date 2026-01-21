/*
Responsive Portfolio - Single-file React component
- Uses Tailwind CSS for styling (must be configured in your project)
- Uses framer-motion for subtle animations
- Uses lucide-react for icons (optional)

How to use:
1. Create a React app (Vite/Create React App/Next.js).
2. Install dependencies: framer-motion and lucide-react (optional)
   npm i framer-motion lucide-react
3. Ensure Tailwind is configured. If not, you can convert classes to plain CSS.
4. Copy this component into a file (e.g. src/AppPortfolio.jsx) and import into your app.
5. Replace placeholder text, images, links and projects with your own content.

Notes: This component is intentionally self-contained and uses Tailwind utility classes.
*/

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Mail, DownloadCloud, Github } from "lucide-react";

export default function Portfolio() {
  const [dark, setDark] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Smart Resume Analyzer",
      desc: "NLP-based resume scorer with keyword suggestions and skill extraction.",
      tech: ["Python", "NLP", "Streamlit"],
      link: "https://github.com/yourusername/resume-analyzer",
    },
    {
      id: 2,
      title: "Interactive Data Dashboard",
      desc: "Interactive visualizations for trends and insights (Plotly + Dash).",
      tech: ["Python", "Plotly", "Dash"],
      link: "https://github.com/yourusername/data-dashboard",
    },
    {
      id: 3,
      title: "File Organizer (Automation)",
      desc: "Python script to auto-organize your Downloads folder by extension.",
      tech: ["Python"],
      link: "https://github.com/yourusername/file-organizer",
    },
  ];

  return (
    <div className={dark ? "min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-white text-gray-900"}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">AP</div>
            <div>
              <h1 className="text-xl font-semibold">Aayush Patil</h1>
              <p className="text-sm opacity-70">Turning coffee ☕ into code 💻</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full hover:bg-gray-200/40"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90">
              <Mail size={16} /> Contact
            </a>

            <a href="/resume.pdf" download className="inline-flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-100/50">
              <DownloadCloud size={16} /> Resume
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Hi, I’m Aayush — a CS student building practical projects and learning rapidly.</h2>
            <p className="mt-4 text-lg opacity-80">I build small tools, automation scripts, and web projects that solve real problems. Currently exploring Python, data visualization, and web development.</p>

            <div className="mt-6 flex gap-3 flex-wrap">
              <a href="#projects" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm">View Projects</a>
              <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="px-4 py-2 border rounded-lg inline-flex items-center gap-2"><Github size={16} /> GitHub</a>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Stat label="Projects" value="6+" />
              <Stat label="Languages" value="Python, JS" />
              <Stat label="Learning" value="React, ML" />
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="flex justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-lg">
              <img src="https://via.placeholder.com/220x220.png?text=Your+Headshot" alt="Headshot" className="rounded-xl" />
            </div>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="mt-12">
          <motion.h3 initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-2xl font-semibold">About Me</motion.h3>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 opacity-80 max-w-3xl">
            I’m a first-year Computer Science Engineering student who loves building practical tools. I enjoy solving problems that make everyday tasks easier and learning modern web & data tools.
          </motion.p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Skills</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {['Python','JavaScript','React','Git','Tailwind','SQL'].map((s) => (
                  <li key={s} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Education</h4>
              <p className="mt-2 text-sm opacity-80">B.Tech — Computer Science Engineering (First Year)</p>
              <p className="mt-2 text-sm opacity-70">Interested in web development, automation, and data visualization.</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mt-12">
          <motion.h3 initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-2xl font-semibold">Selected Projects</motion.h3>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((p) => (
              <motion.a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="block p-4 border rounded-lg hover:shadow-md"
              >
                <h4 className="font-semibold text-lg">{p.title}</h4>
                <p className="mt-2 text-sm opacity-80">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100">{t}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-12 mb-12">
          <motion.h3 initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-2xl font-semibold">Contact</motion.h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h4 className="font-medium">Get in touch</h4>
              <p className="mt-2 text-sm opacity-80">Prefer email? Send a message and I’ll reply within 24-48 hours.</p>

              <div className="mt-4 flex items-center gap-3">
                <Mail size={18} />
                <a href="mailto:youremail@example.com" className="text-sm">youremail@example.com</a>
              </div>

              <div className="mt-4 flex gap-3">
                <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="px-3 py-2 border rounded-lg inline-flex items-center gap-2"><Github size={16} /> GitHub</a>
              </div>
            </div>

            <form className="p-6 border rounded-lg" onSubmit={(e) => { e.preventDefault(); window.location.href = 'mailto:youremail@example.com'; }}>
              <label className="block text-sm font-medium">Name</label>
              <input required className="mt-1 w-full p-2 border rounded-md" placeholder="Your name" />

              <label className="block text-sm font-medium mt-3">Message</label>
              <textarea required className="mt-1 w-full p-2 border rounded-md" placeholder="Say hi or describe your idea" rows={4}></textarea>

              <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Send</button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">© {new Date().getFullYear()} Aayush Patil — Built with ❤️</p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-2"><Github size={14} /> GitHub</a>
            <a href="mailto:youremail@example.com" className="text-sm inline-flex items-center gap-2"><Mail size={14} /> Email</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border p-3 rounded-lg">
      <div className="text-sm opacity-80">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
