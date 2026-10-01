import type { Metadata } from "next";
import Image from "next/image";
import { Arrow } from "@/components/Arrow";
import { getPost } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Products",
  description: "Products built by Magnus Leu. Trading Rookie brings a Next.js dashboard, Python backend, and live market data into one trading analytics platform.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const product = getPost("trading_rookie")!;
  return (
    <main id="content" className="collection-page archive-page section-shell">
      <p className="section-label">From an idea to an interface</p>
      <h1>Products.</h1>
      <p>Practical tools that bring data, engineering, and an everyday use case together.</p>
      <a className="project-feature product-feature" href={product.link} target="_blank" rel="noreferrer">
        <div className="project-art product-art"><div className="product-window"><div className="window-bar" aria-hidden="true"><i /><i /><i /><span>Trading Rookie</span></div><div className="product-preview"><Image src={product.images![0]} alt="Trading Rookie dashboard showing market data and trading analytics" fill sizes="(max-width: 760px) 90vw, 50vw" preload /></div></div></div>
        <div className="project-feature-copy"><span className="project-meta">01 / Trading analytics / 2024</span><h2>Trading<br />Rookie</h2><p>A clearer view<br />of the market.</p><p className="project-description">{product.summary}</p><span className="project-action">Visit the live site <Arrow /></span></div>
      </a>
      <div className="product-footnote"><span>Next.js / Python / Live market data</span></div>
    </main>
  );
}
