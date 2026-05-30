import { NAV, SHELVES, BOOKS } from '../../data/books.js';
import { Emoji, Icon, IconButton, Avatar } from '../primitives/index.jsx';

export function Sidebar({ route, setRoute }) {
  return (
    <aside style={{
      width: 248, flexShrink: 0, height: "100%", position: "relative", zIndex: 3,
      background: "var(--glass-fill)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
      borderRight: "1px solid var(--border)", padding: "24px 16px", display: "flex", flexDirection: "column", gap: 20,
    }}>
      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "2px 8px 0" }}>
        <span className="bk-display" style={{ fontSize: 23, fontWeight: 700, letterSpacing: "-0.02em" }}>Bookish</span>
      </div>

      {/* Primary nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map((n) => {
          const active = route === n.key;
          return (
            <button key={n.key} onClick={() => setRoute(n.key)} style={{
              display: "flex", alignItems: "center", gap: 11, padding: "9px 12px", borderRadius: "var(--radius-md)",
              border: "none", cursor: "pointer", textAlign: "left", width: "100%",
              background: active ? "var(--accent-soft)" : "transparent",
              color: active ? "var(--accent-deep)" : "var(--fg-2)",
              font: `${active ? 600 : 500} 14.5px/1 var(--font-sans)`,
              transition: "background var(--dur-1) var(--ease), color var(--dur-1) var(--ease)",
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-sunken)"; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
              <Emoji size={16}>{n.e}</Emoji>{n.label}
            </button>
          );
        })}
      </nav>

      <div style={{ height: 1, background: "var(--border)" }} />

      {/* Shelves */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 8px 12px" }}>
          <span className="bk-overline">Shelves</span>
          <button title="Create a shelf" style={{ width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 7, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--fg-2)", cursor: "pointer", padding: 0 }}>
            <Icon name="plus" size={14} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {SHELVES.map((s) => {
            const n = BOOKS.filter((b) => b.shelf === s.key).length || (s.key === "favorites" ? 19 : 0);
            return (
              <button key={s.key} onClick={() => setRoute("library")} style={{
                display: "flex", alignItems: "center", gap: 11, padding: "8px 12px", borderRadius: "var(--radius-md)",
                border: "none", background: "transparent", cursor: "pointer", width: "100%", textAlign: "left",
                color: "var(--fg-2)", font: "500 14px/1 var(--font-sans)",
                transition: "background var(--dur-1) var(--ease)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-sunken)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <Emoji size={15}>{s.e}</Emoji>
                <span style={{ flex: 1 }}>{s.label}</span>
                <span style={{ fontSize: 12, color: "var(--fg-3)" }}>{n}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User */}
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, padding: "8px 6px", borderRadius: "var(--radius-md)" }}>
        <Avatar initials="M" size={34} />
        <div style={{ lineHeight: 1.15, flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: "var(--fg-1)" }}>Maya Reyes</div>
          <div style={{ fontSize: 11.5, color: "var(--fg-3)" }}>41 books in 2026</div>
        </div>
        <IconButton name="settings" title="Settings" size={17} />
      </div>
    </aside>
  );
}
