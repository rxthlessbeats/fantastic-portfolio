"use client";

import { useEffect, useRef, useState } from "react";

type Point = [number, number, number];
const TAU = Math.PI * 2;

// A trefoil tube: connected strands, rather than a simulated medical recording.
function strand(t: number, angle: number): Point {
  const x = Math.sin(t) + 2 * Math.sin(2 * t);
  const y = Math.cos(t) - 2 * Math.cos(2 * t);
  const z = -Math.sin(3 * t);
  const dx = Math.cos(t) + 4 * Math.cos(2 * t);
  const dy = -Math.sin(t) + 4 * Math.sin(2 * t);
  const dz = -3 * Math.cos(3 * t);
  const length = Math.hypot(dx, dy, dz);
  const flat = Math.hypot(dx, dy);
  const nx = -dy / flat, ny = dx / flat;
  const bx = -dz * ny / length, by = dz * nx / length, bz = (dx * ny - dy * nx) / length;
  const radius = 0.47 + Math.sin(3 * t) * 0.06;
  return [x + radius * (nx * Math.cos(angle) + bx * Math.sin(angle)), y + radius * (ny * Math.cos(angle) + by * Math.sin(angle)), z + radius * bz * Math.sin(angle)];
}

const STRANDS = Array.from({ length: 56 }, (_, j) => Array.from({ length: 161 }, (_, i) => strand(i / 160 * TAU, j / 56 * TAU)));
const MOBILE_STRANDS = STRANDS.filter((_, j) => j % 2 === 0).map((points) => points.filter((_, i) => i % 2 === 0));

export function Signal() {
  const ref = useRef<HTMLCanvasElement>(null);
  const animationClock = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, visible = true, width = 0, height = 0, last = 0, clock = animationClock.current;
    let targetX = 0, targetY = 0, rotateX = 0, rotateY = 0;

    function draw(time: number) {
      frame = 0;
      if (!ctx || !canvas) return;
      const active = !paused && !media.matches && visible && !document.hidden;
      if (active && time - last < 32) { frame = requestAnimationFrame(draw); return; }
      const delta = Math.min(time - last, 50);
      if (active) clock += delta;
      animationClock.current = clock;
      last = time;
      rotateX += (targetX - rotateX) * 0.045;
      rotateY += (targetY - rotateY) * 0.045;
      ctx.clearRect(0, 0, width, height);
      const yaw = -0.36 + Math.sin(clock * 0.00012) * 0.32 + rotateX;
      const pitch = 0.6 + rotateY;
      const spin = -0.28 + Math.cos(clock * 0.00008) * 0.12;
      const scale = Math.min(width, height) * 0.128;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch), cs = Math.cos(spin), ss = Math.sin(spin);
      const strands = width < 500 ? MOBILE_STRANDS : STRANDS;
      const curves = strands.map((points, index) => {
        let depth = 0;
        const projected = points.map(([x, y, z]) => {
          const a = x * cy + z * sy, b = -x * sy + z * cy;
          const c = y * cp - b * sp, d = y * sp + b * cp;
          depth += d;
          const perspective = 8 / (8 - d);
          return [width * 0.5 + (a * cs - c * ss) * scale * perspective, height * 0.5 + (a * ss + c * cs) * scale * perspective];
        });
        return { projected, depth: depth / points.length, index };
      }).sort((a, b) => a.depth - b.depth);
      for (const { projected, depth, index } of curves) {
        const light = (Math.sin(index / strands.length * TAU) + 1) * 0.5;
        const opacity = Math.min(0.85, Math.max(0.2, 0.44 + depth * 0.16));
        ctx.strokeStyle = light > 0.62 ? `rgba(225,200,195,${opacity})` : `rgba(145,173,249,${opacity})`;
        ctx.lineWidth = width < 500 ? 0.8 : 1;
        ctx.beginPath();
        projected.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
        ctx.stroke();
      }
      if (active) frame = requestAnimationFrame(draw);
    }
    function start() { if (!frame) { last = performance.now(); frame = requestAnimationFrame(draw); } }
    function resize() {
      if (!canvas || !ctx) return;
      width = canvas.clientWidth; height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, width < 500 ? 1.5 : 2);
      canvas.width = Math.max(1, Math.round(width * dpr)); canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      start();
    }
    function move(event: PointerEvent) {
      if (media.matches || paused) return;
      const box = canvas!.getBoundingClientRect();
      targetX = ((event.clientX - box.left) / box.width - 0.5) * 0.6;
      targetY = ((event.clientY - box.top) / box.height - 0.5) * 0.4;
      start();
    }
    function leave() { targetX = targetY = 0; }
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); });
    resizeObserver.observe(canvas); visibilityObserver.observe(canvas);
    canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", start); media.addEventListener("change", start);
    resize();
    return () => { cancelAnimationFrame(frame); resizeObserver.disconnect(); visibilityObserver.disconnect(); canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", leave); document.removeEventListener("visibilitychange", start); media.removeEventListener("change", start); };
  }, [paused]);

  return <div className="signal-art"><canvas ref={ref} aria-hidden="true" /><div className="signal-caption"><span>Everything is connected.</span><button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play artwork animation" : "Pause artwork animation"} aria-pressed={paused}><span className={paused ? "play-symbol" : "pause-symbol"} aria-hidden="true" /></button></div></div>;
}
