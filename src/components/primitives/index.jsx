import { useRef, useEffect, useState } from 'react';

// ---- Icon (Lucide) ----------------------------------------------------------
export function Icon({ name, size = 18, style, className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = `<i data-lucide="${name}"></i>`;
      if (window.lucide) window.lucide.createIcons();
    }
  }, [name]);
  return (
    <span
      ref={ref}
      className={"bk-ic " + (className || "")}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size, flexShrink: 0, ...style }}
    />
  );
}

// ---- Emoji (Noto Color) -----------------------------------------------------
export function Emoji({ children, size = 16, style }) {
  return <span className="bk-emoji" style={{ fontSize: size, ...style }}>{children}</span>;
}

// ---- Button -----------------------------------------------------------------
export function Button({ variant = "primary", children, icon, emoji, onClick, style, size = "md" }) {
  const pad = size === "sm" ? "7px 12px" : size === "lg" ? "12px 20px" : "10px 16px";
  const fs = size === "sm" ? 13 : 13.5;
  return (
    <button className={`bk-btn bk-btn--${variant}`} onClick={onClick} style={{ padding: pad, fontSize: fs, ...style }}>
      {emoji && <Emoji size={fs}>{emoji}</Emoji>}
      {icon && <Icon name={icon} size={fs + 2} />}
      {children}
    </button>
  );
}

// ---- Icon-only button -------------------------------------------------------
export function IconButton({ name, onClick, title, active, size = 18, style }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-md)", cursor: "pointer", border: "1px solid transparent",
        background: active ? "var(--accent-soft)" : "transparent",
        color: active ? "var(--accent-deep)" : "var(--fg-2)",
        transition: "background var(--dur-1) var(--ease), color var(--dur-1) var(--ease)", ...style,
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-sunken)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      <Icon name={name} size={size} />
    </button>
  );
}

// ---- Chip -------------------------------------------------------------------
export function Chip({ children, active, accent, emoji, onClick }) {
  const cls = "bk-chip" + (active ? " bk-chip--active" : "") + (accent ? " bk-chip--accent" : "");
  return (
    <button className={cls} onClick={onClick}>
      {emoji && <Emoji size={13}>{emoji}</Emoji>}
      {children}
    </button>
  );
}

// ---- Progress bar -----------------------------------------------------------
export function Progress({ value, height = 8, track = "var(--accent-soft)", fill, style }) {
  return (
    <div style={{ height, borderRadius: 99, background: track, overflow: "hidden", boxShadow: "inset 0 1px 2px rgba(27,38,95,0.12)", ...style }}>
      <div style={{ width: Math.max(0, Math.min(100, value)) + "%", height: "100%", borderRadius: 99, background: fill || "linear-gradient(90deg, var(--accent-400), var(--accent-600))", boxShadow: "0 1px 4px -1px rgba(53,82,232,0.5)", transition: "width var(--dur-3) var(--ease)" }} />
    </div>
  );
}

// ---- Star rating (emoji, supports halves; any glyph for custom scales) ------
export function Stars({ value = 0, size = 16, gap = 3, char = "⭐" }) {
  return (
    <span style={{ display: "inline-flex", gap }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const pct = Math.max(0, Math.min(1, value - (i - 1))) * 100;
        return (
          <span key={i} style={{ position: "relative", display: "inline-block", width: size, height: size, lineHeight: 1 }}>
            <span className="bk-emoji" style={{ position: "absolute", left: 0, top: 0, fontSize: size, filter: "grayscale(1)", opacity: 0.28 }}>{char}</span>
            <span style={{ position: "absolute", left: 0, top: 0, height: size, width: pct + "%", overflow: "hidden" }}>
              <span className="bk-emoji" style={{ fontSize: size, lineHeight: 1 }}>{char}</span>
            </span>
          </span>
        );
      })}
    </span>
  );
}

// ---- Heart favorite toggle --------------------------------------------------
export function Heart({ active, onClick, withLabel }) {
  return (
    <button onClick={onClick} title={active ? "Remove favorite" : "Add to favorites"} style={{
      display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer",
      padding: withLabel ? "8px 14px" : 8, borderRadius: withLabel ? "var(--radius-pill)" : "var(--radius-md)",
      font: "600 13px/1 var(--font-sans)",
      border: "1px solid " + (active ? "#F6C9D2" : "var(--border)"),
      background: active ? "#FDECEF" : "var(--surface)",
      color: active ? "#C5294B" : "var(--fg-2)",
      transition: "all var(--dur-1) var(--ease)",
    }}>
      <Emoji size={16}>{active ? "❤️" : "🤍"}</Emoji>{withLabel && "Favorite"}
    </button>
  );
}

// ---- Avatar -----------------------------------------------------------------
export function Avatar({ initials = "M", size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 99, flexShrink: 0,
      background: "linear-gradient(140deg, var(--accent-500), var(--accent-700))",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.4,
    }}>{initials}</div>
  );
}

// ---- Badge ------------------------------------------------------------------
export function Badge({ children, tone = "accent", emoji }) {
  const tones = {
    accent:  { bg: "var(--accent-soft)",  fg: "var(--accent-deep)" },
    success: { bg: "var(--success-soft)", fg: "var(--success-deep)" },
    warning: { bg: "var(--warning-soft)", fg: "var(--warning-deep)" },
    neutral: { bg: "var(--surface-sunken)", fg: "var(--fg-2)" },
  };
  const t = tones[tone] || tones.accent;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 99, fontSize: 11.5, fontWeight: 600, background: t.bg, color: t.fg }}>
      {emoji && <Emoji size={11}>{emoji}</Emoji>}{children}
    </span>
  );
}
