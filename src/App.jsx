import { useState } from 'react';
import { Sidebar } from './components/Sidebar/index.jsx';
import { TopBar } from './components/shared/index.jsx';
import { IconButton } from './components/primitives/index.jsx';
import { LibraryScreen, BookDetail, GoalsScreen, StatsScreen, HomeScreen, Placeholder } from './screens/index.jsx';

function App() {
  const [route, setRoute] = useState("library");
  const [book, setBook] = useState(null);

  const openBook = (b) => {
    setBook(b);
    window.requestAnimationFrame(() => {
      const el = document.querySelector(".bk-scroll");
      if (el) el.scrollTop = 0;
    });
  };
  const closeBook = () => setBook(null);
  const go = (r) => { setBook(null); setRoute(r); };

  let screen;
  if (book) screen = <BookDetail book={book} onBack={closeBook} openBook={openBook} />;
  else if (route === "library") screen = <LibraryScreen openBook={openBook} />;
  else if (route === "home") screen = <HomeScreen openBook={openBook} />;
  else if (route === "challenges") screen = <GoalsScreen />;
  else if (route === "stats") screen = <StatsScreen />;
  else if (route === "lists") screen = <Placeholder title="Lists" emoji="📋" blurb="Build your own reading lists — Summer 2026, Comfort rereads, Booker longlist. Group books any way you like, beyond the standard shelves." />;
  else if (route === "authors") screen = <Placeholder title="Authors" emoji="✍️" blurb="Every author on your shelves, with how many of their books you've read and what's still waiting. Follow the writers you love." />;
  else if (route === "history") screen = <Placeholder title="History" emoji="🕒" blurb="A timeline of everything you've finished — when you read it, how fast, and the rating you gave. Your reading life, year by year." />;
  else if (route === "planner") screen = <Placeholder title="Planner" emoji="🗓️" blurb="Plan what's next: schedule reads, set a monthly pace, and line up your TBR so the challenge stays on track." />;
  else screen = <LibraryScreen openBook={openBook} />;

  const topRight = (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <IconButton name="bell" title="Notifications" />
      <IconButton name="layout-grid" title="Grid view" active />
      <IconButton name="list" title="List view" />
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", background: "var(--canvas)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--wash-accent)", pointerEvents: "none", zIndex: 0 }} />

      <Sidebar route={book ? null : route} setRoute={go} />

      <main style={{ flex: 1, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar right={topRight} />
        <div className="bk-scroll" style={{ flex: 1, overflow: "auto", position: "relative" }}>
          <div className="bk-gridpaper" />
          <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "28px 30px 72px" }}>
            {screen}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
