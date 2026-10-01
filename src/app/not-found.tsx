import Link from "next/link";

export default function NotFound() {
  return <main id="content" className="missing section-shell"><p className="section-label">404 / Page not found</p><h1>A missing connection.</h1><p>This page doesn’t exist. The projects are still here.</p><Link href="/">Return to the portfolio</Link></main>;
}
