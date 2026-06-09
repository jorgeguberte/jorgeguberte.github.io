import Link from "next/link";
import { useRouter } from "next/router";
import { navLinks } from "../data/site-content";

export function Navbar() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav className="top-nav">
      <Link href="/" className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-200 transition-colors hover:text-emerald-300">
        Jorge Guberte
      </Link>
      <div className="flex flex-wrap gap-2">
        {navLinks.map((link) => {
          // Determine if the link is active.
          // Home page '/' is active only on root path.
          // Other paths check if pathname starts with the link's href.
          const isActive = !link.external && (
            (link.href === "/" && pathname === "/") ||
            (link.href !== "/" && pathname.startsWith(link.href))
          );

          if (link.external) {
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-pill"
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-pill ${
                isActive
                  ? "border-emerald-300/50 bg-emerald-300/10 text-emerald-200"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
