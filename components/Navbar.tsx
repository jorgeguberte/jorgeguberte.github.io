import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data/site-content";

export function Navbar() {
  const router = useRouter();
  const { pathname } = router;

  // --- Smart auto-hide ---
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const threshold = 64; // px before toggling
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < threshold) {
          setHidden(false);
        } else if (y > lastScrollY.current + 8) {
          setHidden(true);   // scrolling down
          setMobileOpen(false);
        } else if (y < lastScrollY.current - 8) {
          setHidden(false);  // scrolling up
        }
        lastScrollY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Mobile hamburger ---
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className={`top-nav ${hidden ? "top-nav--hidden" : ""} ${
        mobileOpen ? "flex-col !rounded-3xl !items-stretch" : ""
      }`}
    >
      {/* Top row: logo + hamburger on mobile, logo + links on desktop */}
      <div className="flex w-full items-center justify-between md:w-auto">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-200 transition-colors hover:text-emerald-300"
        >
          Jorge Guberte
        </Link>

        {/* Hamburger button — visible only on mobile */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-colors hover:border-emerald-400/50 hover:text-emerald-200 md:hidden"
        >
          {mobileOpen ? (
            // × icon
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            // ☰ icon
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Links — always visible on desktop, toggle on mobile */}
      <div
        className={`flex flex-wrap gap-2 ${
          mobileOpen
            ? "mt-3 flex-col border-t border-white/10 pt-3"
            : "hidden md:flex"
        }`}
      >
        {navLinks.map((link) => {
          const isActive =
            !link.external &&
            ((link.href === "/" && pathname === "/") ||
              (link.href !== "/" && pathname.startsWith(link.href)));

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
