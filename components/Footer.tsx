import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-8 text-sm text-neutral-500 md:flex md:items-center md:justify-between md:gap-6">
      <p className="font-mono text-xs">© {new Date().getFullYear()} Jorge Guberte</p>
      <p className="mt-3 max-w-2xl md:mt-0">
        Building systems around memory, context, retrieval, and the weird places
        where software starts feeling cognitive.
      </p>
    </footer>
  );
}
