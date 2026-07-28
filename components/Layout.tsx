import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { footerContent, navLinks, profile, thesis } from "../data/site-content";

export function Nav() {
  const router = useRouter();
  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + "/");

  return (
    <header className="site-header">
      <div className="shell flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="brand-lockup" aria-label="Jorge Guberte - home">
          <span className="brand-name">Jorge Guberte</span>
          <span className="brand-role">AI systems · São Paulo</span>
        </Link>

        <nav aria-label="Primary navigation" className="nav-scroller">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={"nav-link" + (isActive(link.href) ? " nav-link-active" : "")}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/work-with-me" className="nav-cta">
            Work with me
          </Link>
        </nav>
      </div>
    </header>
  );
}

const footerGroups = [
  {
    label: "Research",
    links: [
      { label: "LoomDB", href: "/lab/loomdb" },
      { label: "EPCG", href: "/lab/epcg" },
      { label: "Ayvu-Talian", href: "/lab/ayvu-talian" },
    ],
  },
  {
    label: "Systems",
    links: [
      { label: "Pixie", href: "/systems/pixie" },
      { label: "Multiverse", href: "/systems/multiverse" },
    ],
  },
  {
    label: "Read",
    links: [
      { label: "Writing", href: "/writing" },
      { label: "RSS", href: "/feed.xml" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell grid gap-14 py-20 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
        <div>
          <p className="kicker mb-7">The through-line</p>
          <p className="footer-thesis">{thesis}</p>
          <a className="link-quiet mt-8 inline-flex" href={"mailto:" + profile.email}>
            {profile.email} ↗
          </a>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {footerGroups.map((group) => (
            <div key={group.label}>
              <p className="kicker mb-5">{group.label}</p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-meta">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="tag">{footerContent.location} · 23.55° S, 46.63° W</p>
          <p className="tag">© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-frame">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="ambient-glow ambient-glow-top" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-bottom" aria-hidden="true" />
      <Nav />
      <main id="main-content" className="relative z-10 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
