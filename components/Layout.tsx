import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { navLinks, profile, thesis, footerContent } from "../data/site-content";

function ThemeToggle() {
  const [y2k, setY2k] = useState(true);

  useEffect(() => {
    // Read initial state from DOM (set by inline script before hydration)
    const active = document.documentElement.classList.contains("y2k-active");
    setY2k(active);
  }, []);

  const toggle = () => {
    const next = !y2k;
    setY2k(next);
    if (next) {
      document.documentElement.classList.add("y2k-active");
      localStorage.setItem("theme", "y2k");
    } else {
      document.documentElement.classList.remove("y2k-active");
      localStorage.setItem("theme", "editorial");
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={y2k ? "Switch to Editorial theme" : "Switch to Y2K theme"}
      className="nav-link flex items-center gap-2"
      title={y2k ? "Y2K Brutalist — click for Editorial" : "High Editorial — click for Y2K"}
    >
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em]">
        {y2k ? "ACID" : "INK"}
      </span>
      <span
        className={`inline-block h-2 w-2 transition-colors duration-300 ${
          y2k ? "bg-[#7fff00]" : "bg-brass-400"
        }`}
      />
    </button>
  );
}

export function Nav() {
  const router = useRouter();
  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + "/");

  return (
    <header className="border-b border-ink-700">
      <div className="shell flex items-center justify-between py-7">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="y2k-chrome font-serif text-xl font-medium tracking-tight text-bone-100 transition-colors group-hover:text-brass-300">
            Jorge Guberte
          </span>
          <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.3em] text-bone-600 md:inline">
            Est. São Paulo
          </span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? "nav-link-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/work-with-me"
            className="hidden border border-brass-500/40 px-4 py-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-brass-400 transition-all duration-300 hover:border-brass-400 hover:text-brass-300 sm:inline-block"
          >
            Work with me
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink-700">
      {/* The thesis, set like a closing epigraph */}
      <div className="shell py-20">
        <p className="kicker mb-8">The thesis, restated</p>
        <p className="pullquote ml-8 max-w-2xl md:ml-12">{thesis}</p>
      </div>

      <div className="section-rule">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:grid-cols-4">
          <div>
            <p className="kicker mb-5">Lab</p>
            <ul className="space-y-2.5">
              <li><Link href="/lab/loomdb" className="nav-link normal-case tracking-normal font-serif text-base">LoomDB</Link></li>
              <li><Link href="/lab/epcg" className="nav-link normal-case tracking-normal font-serif text-base">EPCG</Link></li>
              <li><Link href="/lab/ayvu-talian" className="nav-link normal-case tracking-normal font-serif text-base">Ayvu-Talian</Link></li>
            </ul>
          </div>
          <div>
            <p className="kicker mb-5">Systems</p>
            <ul className="space-y-2.5">
              <li><Link href="/systems/pixie" className="nav-link normal-case tracking-normal font-serif text-base">Pixie</Link></li>
              <li><Link href="/systems/multiverse" className="nav-link normal-case tracking-normal font-serif text-base">Multiverse</Link></li>
            </ul>
          </div>
          <div>
            <p className="kicker mb-5">Writing</p>
            <ul className="space-y-2.5">
              <li><Link href="/writing" className="nav-link normal-case tracking-normal font-serif text-base">Essays</Link></li>
              <li><a href="/feed.xml" className="nav-link normal-case tracking-normal font-serif text-base">RSS</a></li>
            </ul>
          </div>
          <div>
            <p className="kicker mb-5">Elsewhere</p>
            <ul className="space-y-2.5">
              <li><a href={profile.github} className="nav-link normal-case tracking-normal font-serif text-base" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href={`mailto:${profile.email}`} className="nav-link normal-case tracking-normal font-serif text-base">Email</a></li>
              <li><a href={profile.linkedin} className="nav-link normal-case tracking-normal font-serif text-base" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Colophon line */}
      <div className="section-rule">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-7">
          <p className="tag">{footerContent.location} · 23.55° S, 46.63° W</p>
          <p className="tag">
            © {new Date().getFullYear()} {profile.name} · Set in Newsreader &
            IBM Plex Mono
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Y2K Decorative Layer — pointer-events:none, aria-hidden */}
      <div className="y2k-scanlines" aria-hidden="true" />
      <div className="y2k-noise" aria-hidden="true" />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
