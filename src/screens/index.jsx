import { useState } from 'react';
import { BOOKS, GENRES, MONTHLY, MONTHS } from '../data/books.js';
import { Emoji, Button, Chip, Badge, Progress, Stars, Avatar, Heart, Icon } from '../components/primitives/index.jsx';
import { PageHeader, GoalStrip, Ring, StatCard, SectionTitle } from '../components/shared/index.jsx';
import { BookCard, BookRow, Cover } from '../components/BookCard/index.jsx';

const FILTERS = [
  { key: "all", label: "All" },
  { key: "reading", label: "Currently reading" },
  { key: "want", label: "Want to read" },
  { key: "finished", label: "Finished" },
];

export function LibraryScreen({ openBook }) {
  const [filter, setFilter] = useState("all");
  const books = filter === "all" ? BOOKS : BOOKS.filter((b) => b.shelf === filter);
  return (
    <div>
      <PageHeader eyebrow="Your library · 128 books" title="Library" right={
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="secondary" icon="arrow-up-down" size="sm">Sort</Button>
          <Button variant="primary" icon="plus" size="sm">Add book</Button>
        </div>
      } />
      <div style={{ marginBottom: 22 }}><GoalStrip /></div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <Chip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>{f.label}</Chip>
        ))}
        <div style={{ flex: 1 }} />
        <Chip emoji="❤️">Favorites</Chip>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(152px, 1fr))", gap: "26px 22px" }}>
        {books.map((b) => <BookCard key={b.id} book={b} onClick={() => openBook(b)} />)}
      </div>
    </div>
  );
}

const REVIEWS = [
  { who: "Maya Reyes", init: "M", stars: 5, when: "2 days ago", text: "Quietly devastating and hopeful at once. The structure rewards patience — by the end I didn't want to leave." },
  { who: "Dev Okonkwo", init: "D", stars: 4, when: "1 week ago", text: "Gorgeous prose. Dragged a little in the middle third for me, but the payoff is worth it." },
];

export function BookDetail({ book, onBack, openBook }) {
  const related = BOOKS.filter((b) => b.genre === book.genre && b.id !== book.id).slice(0, 3);
  const reading = book.shelf === "reading";
  const [fav, setFav] = useState(book.shelf === "favorites");
  return (
    <div>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "none", background: "transparent", color: "var(--fg-2)", font: "600 13.5px var(--font-sans)", cursor: "pointer", marginBottom: 18, padding: "4px 4px" }}>
        <Icon name="arrow-left" size={16} /> Back to Library
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "232px 1fr", gap: 40, alignItems: "start" }}>
        {/* left rail */}
        <div style={{ position: "sticky", top: 90 }}>
          <Cover book={book} w={232} h={320} radius="var(--radius-xl)" fontSize={20} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
            <Button variant="primary" icon={reading ? "book-open" : "plus"} style={{ justifyContent: "center" }}>
              {reading ? "Update progress" : "Want to read"}
            </Button>
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="secondary" icon="bookmark" style={{ flex: 1, justifyContent: "center" }}>Shelf</Button>
              <Heart active={fav} onClick={() => setFav(!fav)} withLabel />
            </div>
            <Button variant="ghost" icon="share-2" style={{ justifyContent: "center" }}>Share</Button>
          </div>
        </div>

        {/* main */}
        <div style={{ minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--fg-1)" }}>{book.t}</h1>
          <div style={{ fontSize: 16, color: "var(--fg-2)", marginTop: 6 }}>by <span style={{ color: "var(--accent-deep)", fontWeight: 600 }}>{book.a}</span></div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Stars value={Math.round((book.rating || 4))} size={16} /><span style={{ fontWeight: 700, fontSize: 14 }} className="bk-num">{(book.rating || 4).toFixed(1)}</span><span style={{ color: "var(--fg-3)", fontSize: 13 }}>· 2,481 ratings</span></span>
            <Badge tone="neutral">{book.genre}</Badge>
            <Badge tone="neutral" emoji="📄">{book.pages} pages</Badge>
            <Badge tone="neutral">{book.year}</Badge>
          </div>

          {reading && (
            <div className="bk-card" style={{ padding: 18, marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Your progress</span>
                <span style={{ fontSize: 13, color: "var(--fg-2)" }} className="bk-num">page {Math.round(book.pages * book.p / 100)} of {book.pages} · {book.p}%</span>
              </div>
              <Progress value={book.p} height={8} />
              <div style={{ fontSize: 12.5, color: "var(--fg-3)", marginTop: 10 }}>Started 6 days ago · about 3 hours left at your pace</div>
            </div>
          )}

          <p style={{ marginTop: 20, fontSize: 15.5, lineHeight: 1.7, color: "var(--fg-1)", maxWidth: 620 }}>
            A sweeping, ambitious novel that braids together the lives of strangers drawn into the lives of trees. By turns intimate and planetary in scale, it asks what we owe the living world — and what it might still teach us about ourselves.
          </p>

          <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["#literary", "#nature", "#booker-winner", "#slow-burn"].map((t) => <Badge key={t} tone="accent">{t}</Badge>)}
          </div>

          {/* reviews */}
          <div style={{ marginTop: 34 }}>
            <SectionTitle action={<Button variant="ghost" size="sm" icon="pencil">Write a review</Button>}>Community reviews</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {REVIEWS.map((r, i) => (
                <div key={i} className="bk-card" style={{ padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <Avatar initials={r.init} size={32} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{r.who}</div>
                      <div style={{ fontSize: 11.5, color: "var(--fg-3)" }}>{r.when}</div>
                    </div>
                    <Stars value={r.stars} size={13} />
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-1)" }}>{r.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* related */}
          {related.length > 0 && (
            <div style={{ marginTop: 30 }}>
              <SectionTitle>More {book.genre}</SectionTitle>
              <div className="bk-card" style={{ padding: 6 }}>
                {related.map((b) => <BookRow key={b.id} book={b} onClick={() => openBook(b)} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function GoalsScreen() {
  const past = [
    { year: 2025, read: 52, goal: 50 },
    { year: 2024, read: 48, goal: 45 },
    { year: 2023, read: 31, goal: 40 },
  ];
  const monthlyBooks = [4, 3, 5, 6, 3, 7, 4, 5, 4, 0, 0, 0];
  const maxB = Math.max(...monthlyBooks);
  return (
    <div>
      <PageHeader eyebrow="Reading challenges" title="2026 Challenge" right={<Button variant="secondary" icon="settings" size="sm">Adjust goal</Button>} />

      <div className="bk-goal-glass" style={{ display: "flex", alignItems: "center", gap: 30, padding: "28px 30px", marginBottom: 24 }}>
        <Ring pct={68} size={120} label="68%" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>41 of 60 books</div>
          <div style={{ fontSize: 14.5, color: "var(--fg-2)", marginTop: 4 }}>You're <span style={{ color: "var(--accent-deep)", fontWeight: 600 }}>4 books ahead</span> of schedule. Projected finish: <strong>67 books</strong> by Dec 31.</div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <Badge tone="success" emoji="🔥">28-day streak</Badge>
            <Badge tone="accent" emoji="⚡">On pace for a record</Badge>
          </div>
        </div>
        <Emoji size={52}>🎯</Emoji>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        <div className="bk-card" style={{ padding: 22 }}>
          <SectionTitle>Books finished by month</SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 150, paddingTop: 8 }}>
            {monthlyBooks.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                <div style={{ width: "100%", maxWidth: 28, height: maxB ? (v / maxB) * 120 : 0, minHeight: v ? 6 : 0, borderRadius: 6, background: v ? "linear-gradient(180deg, var(--accent-400), var(--accent-600))" : "var(--surface-sunken)" }} />
                <span style={{ fontSize: 11, color: "var(--fg-3)" }}>{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <StatCard emoji="📚" value="41" label="Books this year" sub="+9 vs 2025" accent />
          <StatCard emoji="📄" value="12,480" label="Pages read" />
        </div>
      </div>

      <div className="bk-card" style={{ padding: 22 }}>
        <SectionTitle>Past challenges</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {past.map((p, i) => (
            <div key={p.year} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderTop: i ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontWeight: 700, fontSize: 15, width: 52 }} className="bk-num">{p.year}</span>
              <Progress value={Math.min(100, (p.read / p.goal) * 100)} height={8} style={{ flex: 1 }} />
              <span style={{ fontSize: 13.5, color: "var(--fg-2)", width: 120, textAlign: "right" }} className="bk-num">{p.read} / {p.goal} books</span>
              <Badge tone="success" emoji="✅">Completed</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatsScreen() {
  const maxP = Math.max(...MONTHLY);
  return (
    <div>
      <PageHeader eyebrow="Insights" title="Your reading, 2026" right={<Button variant="secondary" icon="calendar" size="sm">This year</Button>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 24 }}>
        <StatCard emoji="📚" value="41" label="Books finished" sub="+28%" accent />
        <StatCard emoji="📄" value="12,480" label="Pages read" sub="≈ 416/wk" accent />
        <StatCard emoji="⭐" value="4.3" label="Average rating" />
        <StatCard emoji="🔥" value="28" label="Day streak" sub="personal best" accent />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
        <div className="bk-card" style={{ padding: 22 }}>
          <SectionTitle action={<Badge tone="neutral">pages / month</Badge>}>Reading volume</SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 9, height: 180, paddingTop: 8 }}>
            {MONTHLY.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                <div title={v + " pages"} style={{ width: "100%", maxWidth: 30, height: (v / maxP) * 150, borderRadius: 6, background: "linear-gradient(180deg, var(--accent-400), var(--accent-600))" }} />
                <span style={{ fontSize: 11, color: "var(--fg-3)" }}>{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bk-card" style={{ padding: 22 }}>
          <SectionTitle>Genres</SectionTitle>
          <div style={{ display: "flex", height: 14, borderRadius: 99, overflow: "hidden", marginBottom: 18 }}>
            {GENRES.map((g) => <div key={g.name} style={{ width: g.pct + "%", background: g.color }} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {GENRES.map((g) => (
              <div key={g.name} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: g.color }} />
                <span style={{ flex: 1, color: "var(--fg-1)" }}>{g.name}</span>
                <span style={{ color: "var(--fg-3)", fontWeight: 600 }} className="bk-num">{g.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeScreen({ openBook }) {
  const reading = BOOKS.filter((b) => b.shelf === "reading");
  const next = BOOKS.filter((b) => b.shelf === "want");
  return (
    <div>
      <PageHeader eyebrow="Saturday, May 30" title="Good evening, Maya" right={<Button variant="primary" icon="plus" size="sm">Add book</Button>} />
      <div style={{ marginBottom: 24 }}><GoalStrip /></div>
      <SectionTitle action={<Button variant="ghost" size="sm" icon="chevron-right">See all</Button>}>Continue reading</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(152px, 1fr))", gap: "26px 22px", marginBottom: 30 }}>
        {reading.map((b) => <BookCard key={b.id} book={b} onClick={() => openBook(b)} />)}
      </div>
      <SectionTitle action={<Button variant="ghost" size="sm" icon="chevron-right">See all</Button>}>Up next</SectionTitle>
      <div className="bk-card" style={{ padding: 6 }}>
        {next.map((b) => <BookRow key={b.id} book={b} onClick={() => openBook(b)} />)}
      </div>
    </div>
  );
}

export function Placeholder({ title, emoji, blurb }) {
  return (
    <div>
      <PageHeader eyebrow="Your reading" title={title} />
      <div className="bk-card" style={{ padding: "60px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Emoji size={46}>{emoji}</Emoji>
        <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em" }}>{title}</div>
        <div style={{ color: "var(--fg-2)", fontSize: 14, maxWidth: 400, lineHeight: 1.6 }}>{blurb}</div>
      </div>
    </div>
  );
}
