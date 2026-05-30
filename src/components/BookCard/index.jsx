import { useState } from 'react';
import { COVER } from '../../data/books.js';
import { Emoji, Progress, Stars, Badge } from '../primitives/index.jsx';

export function Cover({ book, w = 152, h = 210, radius = "var(--radius-lg)", fontSize = 15 }) {
  const c = COVER[book.cover] || COVER.indigo;
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, position: "relative", overflow: "hidden",
      background: c.bg, boxShadow: "var(--shadow-cover)", border: "1px solid rgba(20,24,55,0.06)",
    }}>
      <div style={{ position: "absolute", inset: 0, padding: "14px 13px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Emoji size={Math.round(fontSize * 1.4)} style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.12))" }}>{book.e}</Emoji>
        <div style={{ color: c.ink, fontWeight: 700, fontSize, lineHeight: 1.18, letterSpacing: "-0.01em" }}>{book.t}</div>
      </div>
    </div>
  );
}

export function BookCard({ book, onClick, w = 152 }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: w, cursor: "pointer", transition: "transform var(--dur-2) var(--ease)", transform: hover ? "translateY(-3px)" : "none" }}
    >
      <div style={{ filter: hover ? "drop-shadow(0 16px 26px rgba(16,20,30,0.20))" : "none", transition: "filter var(--dur-2) var(--ease)" }}>
        <Cover book={book} w={w} h={Math.round(w * 1.38)} />
      </div>
      <div style={{ marginTop: 9, fontWeight: 600, fontSize: 13.5, color: "var(--fg-1)", lineHeight: 1.2, letterSpacing: "-0.01em" }}>{book.t}</div>
      <div style={{ marginTop: 2, fontSize: 12, color: "var(--fg-3)" }}>{book.a}</div>
      {book.shelf === "reading" && book.p > 0 && (
        <Progress value={book.p} style={{ marginTop: 8 }} />
      )}
      {book.shelf === "reading" && book.p > 0 && (
        <div style={{ marginTop: 5, fontSize: 11, color: "var(--fg-3)", fontWeight: 500 }}>{book.p}% · pg {Math.round(book.pages * book.p / 100)}</div>
      )}
      {book.shelf === "finished" && (
        <div style={{ marginTop: 8 }}><Stars value={book.rating} size={13} /></div>
      )}
      {book.shelf === "want" && (
        <div style={{ marginTop: 8 }}><Badge tone="neutral" emoji="🔖">Want to read</Badge></div>
      )}
    </div>
  );
}

// compact horizontal row
export function BookRow({ book, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", gap: 14, padding: 10, borderRadius: "var(--radius-lg)", cursor: "pointer", background: hover ? "var(--surface-sunken)" : "transparent", transition: "background var(--dur-1) var(--ease)" }}>
      <Cover book={book} w={48} h={68} radius="var(--radius-sm)" fontSize={0} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--fg-1)", letterSpacing: "-0.01em" }}>{book.t}</div>
        <div style={{ fontSize: 12.5, color: "var(--fg-3)", marginTop: 1 }}>{book.a}</div>
        <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
          {book.rating > 0 && <Stars value={book.rating} size={12} />}
          <Badge tone="neutral">{book.genre}</Badge>
        </div>
      </div>
    </div>
  );
}
