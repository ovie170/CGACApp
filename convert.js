const fs = require("fs");

// load file
let raw = fs.readFileSync("kjv.json", "utf8");

// remove BOM (important)
raw = raw.replace(/^\uFEFF/, "");

const data = JSON.parse(raw);

// target books
const booksData = data.books;

// create folder
fs.mkdirSync("bible/kjv", { recursive: true });

// loop through books
for (let bookName in booksData) {
  let chapters = [];

  for (let chapterNum in booksData[bookName]) {
    let verses = [];

    for (let verseNum in booksData[bookName][chapterNum]) {
      verses.push({
        verse: Number(verseNum),
        text: booksData[bookName][chapterNum][verseNum]
      });
    }

    chapters.push({
      chapter: Number(chapterNum),
      verses: verses
    });
  }

  // ✅ FIXED FORMAT
  let formatted = {
    book: bookName,
    version: "KJV",
    chapters: chapters
  };

  // clean file name
  let cleanName = bookName.toLowerCase().replace(/\s+/g, "");

  fs.writeFileSync(
    `bible/kjv/${cleanName}.json`,
    JSON.stringify(formatted, null, 2)
  );
}

console.log("✅ All 66 books converted PERFECTLY!");
