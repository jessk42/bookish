import { useState } from 'react';
import { Icon, Emoji, Badge } from '../primitives/index.jsx';

export function TopBar({ onSearch, right }) {
  const [q, setQ] = useState("");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 30px", borderBottom: "1px solid var(--border)", background: "var(--surface)", position: "sticky", top: 0, zIndex: 5 }}>
      <div style={{ position: "relative", flex: 1, maxWidth: 420 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--fg-3)", display: "flex" }}><Icon name="search" size={17} /></span>
        <input className="bk-input" placeholder="Search your library, authors, ISBN…" value={q}
          onChange={(e) => { setQ(e.target.value); onSearch && onSearch(e.target.value); }}
          style={{ paddingLeft: 36, background: "var(--surface-sunken)", border: "1px solid transparent" }} />
      </div>
      <div style={{ flex: 1 }} />
      {right}
    </div>
  );
}

export function Ring({ pct = 68, size = 56, label }) {
  const inner = size - 12;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: 99, background: `conic-gradient(var(--accent-500) 0% ${pct}%, var(--accent-soft) ${pct}% 100%)` }} />
      <div style={{ position: "absolute", inset: 6, borderRadius: 99, background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.23, color: "var(--fg-1)" }}>{label}</div>
    </div>
  );
}

// The ONE aero moment — used on Library + Goals.
export function GoalStrip({ pct = 68, read = 41, goal = 60, ahead = 4 }) {
  return (
    <div className="bk-goal-glass" style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 20px" }}>
      <Ring pct={pct} size={56} label={pct + "%"} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15.5, color: "var(--fg-1)", letterSpacing: "-0.01em" }}>2026 Reading Challenge</div>
        <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>
          {read} of {goal} books · <span style={{ color: "var(--accent-deep)", fontWeight: 600 }}>{ahead} ahead of schedule</span>
        </div>
      </div>
      <Badge tone="accent" emoji="🔥">{ahead} ahead</Badge>
      <Emoji size={30}>🎯</Emoji>
    </div>
  );
}

export function StatCard({ emoji, value, label, sub, accent }) {
  return (
    <div className="bk-card" style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Emoji size={22}>{emoji}</Emoji>
        {sub && <span style={{ fontSize: 12, fontWeight: 600, color: accent ? "var(--success-deep)" : "var(--fg-3)" }}>{sub}</span>}
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--fg-1)", marginTop: 6 }} className="bk-num">{value}</div>
      <div style={{ fontSize: 13, color: "var(--fg-2)" }}>{label}</div>
    </div>
  );
}

export function SectionTitle({ children, action }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "4px 0 14px" }}>
      <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--fg-1)" }}>{children}</h2>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
      <div>
        {eyebrow && <div style={{ fontSize: 12.5, color: "var(--fg-3)", fontWeight: 600, marginBottom: 4 }}>{eyebrow}</div>}
        <h1 className="bk-h1" style={{ margin: 0 }}>{title}</h1>
      </div>
      {right}
    </div>
  );
}
