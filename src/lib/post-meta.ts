const KINDS: Record<string, string> = {
  "menter-rf-analog-multi-agent-netlist-design": "Publication",
  trading_rookie: "Product",
};

const INDEX: Record<string, { title: string; line: string }> = {
  "airline-travel-intent-classification": {
    title: "Airline intent",
    line: "96.2% accuracy · TextCNN on ATIS",
  },
  "cityscapes-traffic-safety-segmentation": {
    title: "Cityscapes",
    line: "FCN-8s, U-Net, and DeepLabV3+ on urban scenes",
  },
  "menter-rf-analog-multi-agent-netlist-design": {
    title: "MenTeR",
    line: "IEEE ICLAD 2025 · RF/analog netlists",
  },
  "mimic4-abp-hybridnn-cnn-lstm-blood-pressure": {
    title: "Blood pressure",
    line: "BHS Grade A from ECG and PPG",
  },
  "option-pricing-implied-volatility-neural-networks": {
    title: "Option pricing",
    line: "Faster Black-Scholes and implied volatility",
  },
  "project-resilience-k-assistant": {
    title: "ResiDemy",
    line: "Multi-agent RAG for Resilience Academy",
  },
  trading_rookie: {
    title: "Trading Rookie",
    line: "Full-stack trading analytics",
  },
  "1d-resnet-based-unet-sleep-detection": {
    title: "Sleep states",
    line: "1D ResNet-UNet on wrist accelerometry",
  },
  "index-tracking-portfolio-optimization": {
    title: "Index tracking",
    line: "Sparse S&P replication with quadratic programming",
  },
};

export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  publishedAt: string;
  tag?: string;
  image?: string;
  images?: string[];
  link?: string;
  body: string;
  kind: string;
};

export function kindOf(slug: string) {
  return KINDS[slug] ?? "Project";
}

export function collectionOf(kind: string) {
  if (kind === "Publication") return { href: "/publications", label: "Publications" };
  if (kind === "Product") return { href: "/products", label: "Products" };
  return { href: "/projects", label: "Projects" };
}

export function yearOf(publishedAt: string) {
  return publishedAt.slice(0, 4);
}

export function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function indexOf(slug: string, title: string, summary: string) {
  return INDEX[slug] ?? { title, line: summary };
}

export function coverOf(slug: string, thumbnail = false) {
  return INDEX[slug] ? `/images/covers/${slug}${thumbnail ? "-mark.svg" : ".png"}` : "/images/og.png";
}

export function formatDate(publishedAt: string) {
  const [y, m, d] = publishedAt.split("-").map(Number);
  if (!y || !m || !d) return publishedAt;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
