import type { ReactNode } from "react";
import { headingId } from "@/lib/post-meta";
import { imageDimensions } from "@/lib/posts";

export function Media({ src, alt }: { src: string; alt?: string }) {
  return (
    <figure className="figure">
      <img src={src} alt={alt || ""} {...imageDimensions(src)} loading="lazy" decoding="async" />
    </figure>
  );
}

export function Text({ children }: { children?: ReactNode }) {
  return <div className="caption">{children}</div>;
}

export function Table({
  data,
}: {
  data: { headers: { content: string; key: string }[]; rows: string[][] };
}) {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="Research data table">
      <table>
        <thead>
          <tr>
            {data.headers.map((header) => (
              <th key={header.key} scope="col">{header.content}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Button({ href, label }: { href: string; label?: string }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {label} <span aria-hidden="true">→</span>
    </a>
  );
}

export function Row({ children }: { children?: ReactNode }) {
  return <div className="link-row">{children}</div>;
}

function Heading({ children }: { children?: ReactNode }) {
  return <h2 id={headingId(String(children))}>{children}</h2>;
}

export const mdxComponents = { Media, Text, Table, Button, Row, h2: Heading };
