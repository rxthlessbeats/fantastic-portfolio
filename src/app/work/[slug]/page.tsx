import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Arrow } from "@/components/Arrow";
import { mdxComponents } from "@/components/mdx";
import { formatDate, getPost, getPosts, indexOf, imageDimensions } from "@/lib/posts";
import { collectionOf, coverOf, headingId } from "@/lib/post-meta";
import { site } from "@/content/profile";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const image = coverOf(slug);
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title: post.title, description: post.summary, url: `/work/${slug}`, type: "article", publishedTime: post.publishedAt, images: [image] },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary, images: [image] },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const collection = collectionOf(post.kind);
  const originalFigure = slug === "menter-rf-analog-multi-agent-netlist-design" || slug === "cityscapes-traffic-safety-segmentation" ? post.image : undefined;
  const tags = post.tag?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? [];
  const headings = [...post.body.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
  const posts = getPosts();
  const next = posts[(posts.findIndex((item) => item.slug === slug) + 1) % posts.length];
  const nextTitle = indexOf(next.slug, next.title, next.summary).title;
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.summary, datePublished: post.publishedAt, author: { "@type": "Person", name: "Magnus Leu", url: site.url }, image: `${site.url}${coverOf(slug)}` };

  return (
    <main id="content" className="case section-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Link className="case-back" href={collection.href}><Arrow />{collection.label}</Link>
      <header className="case-header">
        <div className="case-meta"><span>{post.kind}</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div>
        <h1>{post.title}</h1>
        {post.subtitle && <p className="case-subtitle">{post.subtitle}</p>}
        <div className="case-overview"><ul className="case-tags">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><div><p className="case-summary">{post.summary}</p>{post.link && <p className="case-links"><a href={post.link} target="_blank" rel="noreferrer">Visit the live site</a></p>}</div></div>
      </header>
      <figure className="case-hero"><img src={coverOf(slug)} alt={`${indexOf(post.slug, post.title, post.summary).title} cover illustration`} width={1200} height={675} fetchPriority="high" /></figure>
      {!!post.images?.length && <div className="case-gallery">{post.images.map((src, i) => <img key={src} src={src} alt={`${post.title} interface, view ${i + 1}`} {...imageDimensions(src)} loading={i === 0 ? "eager" : "lazy"} />)}</div>}
      {post.body.trim() && <div className="case-body"><nav className="case-toc" aria-label="On this page"><p>In this study</p><div>{headings.map((heading) => <a key={heading} href={`#${headingId(heading)}`}>{heading}</a>)}</div></nav><article className="prose">{originalFigure && <figure className="figure"><img src={originalFigure} alt={post.kind === "Publication" ? "MenTeR workflow overview" : "Cityscapes example street scene"} {...imageDimensions(originalFigure)} loading="lazy" /></figure>}<MDXRemote source={post.body} components={mdxComponents} options={{ blockJS: false }} /></article></div>}
      <Link className="case-next" href={`/work/${next.slug}`}><div><p className="section-label">Keep exploring</p><h2>{nextTitle}</h2></div><span className="circle-arrow"><Arrow /></span></Link>
    </main>
  );
}
