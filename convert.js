const fs = require("fs");
const path = require("path");

// ===== CONFIG =====
const INPUT_FILE = "kjv.json";
const OUTPUT_DIR = path.join(__dirname, "bibles", "kjv");

// ===== READ + CLEAN FILE =====
function loadJSON(file) {
  let raw = fs.readFileSync(file);

  // convert buffer → string
  raw = raw.toString("utf8");

  // remove BOM
  raw = raw.replace(/^\uFEFF/, "");

  // remove anything before first {
  raw = raw.slice(raw.indexOf("{"));

  return JSON.parse(raw);
}

// ===== NORMALIZE BOOK NAME =====
function normalizeBookName(name) {
  return name.replace(/\s+/g, ""); // remove spaces (e.g. "1 Samuel" → "1Samuel")
}

// ===== MAIN =====
function convert() {
  console.log("📖 Loading KJV...");

  const data = loadJSON(INPUT_FILE);

  if (!data.books || !Array.isArray(data.books)) {
    throw new Error("❌ Invalid KJV format: 'books' array missing");
  }

  // create output folder
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`📚 Found ${data.books.length} books`);

  data.books.forEach((book, index) => {
    const safeName = normalizeBookName(book.name);

    const newBook = {
      book: book.name,
      chapters: book.chapters.map(ch => ({
        chapter: ch.chapter,
        verses: ch.verses.map(v => ({
          verse: v.verse,
          text: v.text.trim()
        }))
      }))
    };

    const filePath = path.join(OUTPUT_DIR, `${safeName}.json`);

    fs.writeFileSync(filePath, JSON.stringify(newBook, null, 2));

    console.log(`✅ ${index + 1}/66 → ${safeName}.json`);
  });

  console.log("🎉 Conversion complete!");
}

convert();
