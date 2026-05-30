// data/books.js — shared fake content for the Bookish app

export const COVER = {
  indigo: { bg: "linear-gradient(165deg, #FBFCFF 6%, #DCE3FB 100%)", ink: "#2A41C9" },
  teal:   { bg: "linear-gradient(165deg, #FBFFFD 6%, #D6F0E4 100%)", ink: "#0E8060" },
  amber:  { bg: "linear-gradient(165deg, #FFFDFB 6%, #FBE4D4 100%)", ink: "#C2520C" },
  violet: { bg: "linear-gradient(165deg, #FFFCFF 6%, #ECE2FB 100%)", ink: "#6D28D9" },
  ocean:  { bg: "linear-gradient(165deg, #FBFDFF 6%, #D7E9FA 100%)", ink: "#1F6FB2" },
  rose:   { bg: "linear-gradient(165deg, #FFFBFD 6%, #FBE0EC 100%)", ink: "#B83A6A" },
  forest: { bg: "linear-gradient(165deg, #FCFFFB 6%, #E2EFD8 100%)", ink: "#4F7C2F" },
  slate:  { bg: "linear-gradient(165deg, #FDFEFF 6%, #E1E7F0 100%)", ink: "#475569" },
};

export const BOOKS = [
  { id: 1,  t: "The Overstory",       a: "Richard Powers",      e: "🌲", cover: "forest", p: 72,  rating: 5, shelf: "reading",  genre: "Literary", pages: 502, year: 2018 },
  { id: 2,  t: "Klara and the Sun",   a: "Kazuo Ishiguro",      e: "🤖", cover: "teal",   p: 38,  rating: 4, shelf: "reading",  genre: "Sci-Fi",   pages: 320, year: 2021 },
  { id: 3,  t: "Tomorrow, and Tomorrow, and Tomorrow", a: "Gabrielle Zevin", e: "🎮", cover: "rose", p: 100, rating: 5, shelf: "finished", genre: "Literary", pages: 416, year: 2022 },
  { id: 4,  t: "Piranesi",            a: "Susanna Clarke",      e: "🗝️", cover: "ocean",  p: 15,  rating: 0, shelf: "reading",  genre: "Fantasy",  pages: 245, year: 2020 },
  { id: 5,  t: "Sea of Tranquility",  a: "Emily St. John Mandel",e: "🌙", cover: "violet", p: 0,  rating: 0, shelf: "want",     genre: "Sci-Fi",   pages: 272, year: 2022 },
  { id: 6,  t: "Babel",               a: "R. F. Kuang",         e: "📜", cover: "amber",  p: 54,  rating: 4, shelf: "reading",  genre: "Fantasy",  pages: 545, year: 2022 },
  { id: 7,  t: "Project Hail Mary",   a: "Andy Weir",           e: "🚀", cover: "indigo", p: 100, rating: 5, shelf: "finished", genre: "Sci-Fi",   pages: 496, year: 2021 },
  { id: 8,  t: "Circe",               a: "Madeline Miller",     e: "🔮", cover: "violet", p: 100, rating: 5, shelf: "finished", genre: "Fantasy",  pages: 393, year: 2018 },
  { id: 9,  t: "The Vanishing Half",  a: "Brit Bennett",        e: "🪞", cover: "rose",   p: 100, rating: 4.5, shelf: "finished", genre: "Literary", pages: 343, year: 2020 },
  { id: 10, t: "A Psalm for the Wild-Built", a: "Becky Chambers", e: "🍵", cover: "teal", p: 0,  rating: 0, shelf: "want",     genre: "Sci-Fi",   pages: 160, year: 2021 },
  { id: 11, t: "Pachinko",            a: "Min Jin Lee",         e: "🎲", cover: "ocean",  p: 100, rating: 5, shelf: "finished", genre: "Historical", pages: 490, year: 2017 },
  { id: 12, t: "The Three-Body Problem", a: "Cixin Liu",        e: "🪐", cover: "slate",  p: 0,  rating: 0, shelf: "want",     genre: "Sci-Fi",   pages: 400, year: 2008 },
];

export const SHELVES = [
  { key: "reading",  e: "📖", label: "Currently reading" },
  { key: "want",     e: "🔖", label: "Want to read" },
  { key: "finished", e: "✅", label: "Finished" },
  { key: "favorites",e: "❤️", label: "Favorites" },
];

export const NAV = [
  { key: "home",       e: "🏠", label: "Home" },
  { key: "library",    e: "📚", label: "Library" },
  { key: "lists",      e: "📋", label: "Lists" },
  { key: "authors",    e: "✍️", label: "Authors" },
  { key: "history",    e: "🕒", label: "History" },
  { key: "challenges", e: "🎯", label: "Challenges" },
  { key: "planner",    e: "🗓️", label: "Planner" },
  { key: "stats",      e: "📊", label: "Stats" },
];

export const GENRES = [
  { name: "Sci-Fi",     pct: 34, color: "#3552E8" },
  { name: "Literary",   pct: 26, color: "#0E7C66" },
  { name: "Fantasy",    pct: 20, color: "#5B21B6" },
  { name: "Historical", pct: 12, color: "#C2410C" },
  { name: "Other",      pct: 8,  color: "#9AA0AE" },
];

export const MONTHLY = [820, 640, 910, 1120, 760, 1340, 980, 1180, 1420, 1060, 1290, 540];
export const MONTHS = ["J","F","M","A","M","J","J","A","S","O","N","D"];
