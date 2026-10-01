"use client";

import { useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { coverOf, indexOf, yearOf, type Post } from "@/lib/post-meta";

const FILTERS = ["All", "Project", "Publication", "Product"] as const;

export function WorkList({ items, filterable = true }: { items: Omit<Post, "body">[]; filterable?: boolean }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const visible = filter === "All" ? items : items.filter((item) => item.kind === filter);

  return (
    <div className="work-index">
      {filterable && <div className="filters" role="group" aria-label="Filter work">
        {FILTERS.map((name) => <button key={name} type="button" aria-pressed={filter === name} onClick={() => setFilter(name)}>{name === "All" ? "Everything" : `${name}s`}<span>{name === "All" ? items.length : items.filter((item) => item.kind === name).length}</span></button>)}
      </div>}
      <p className="sr-only" role="status">Showing {visible.length} {filter === "All" ? "works" : `${filter.toLowerCase()}s`}</p>
      <div className="work-list">
        {visible.map((item) => {
          const meta = indexOf(item.slug, item.title, item.summary);
          return <Link key={item.slug} className="work-row" href={`/work/${item.slug}`}><span className="work-thumbnail"><img src={coverOf(item.slug, true)} alt="" width={96} height={96} loading="lazy" /></span><span className="work-copy"><span className="work-title">{meta.title}</span><span className="work-summary">{meta.line}</span></span><span className="work-kind">{item.kind}</span><span className="work-year">{yearOf(item.publishedAt)}</span><Arrow /></Link>;
        })}
      </div>
    </div>
  );
}
