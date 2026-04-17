const fs = require("fs");

// load file
let raw = fs.readFileSync("kjv.json", "utf8");

// remove BOM
raw = raw.replace(/^\uFEFF/, "");

const data = JSON.parse(raw);

// 🔥 correct root
const booksData = data.books;

// create folder
fs.mkdirSync("bible/kjv", { recursive: true });

// loop books
for (let bookName in booksData) {

  let chapters = [];

  let book = booksData[bookName];

  for (let chapterNum in book) {

    let verses = [];

    let chapter = book[chapterNum];

    for (let verseNum in chapter) {
      verses.push({
        verse: Number(verseNum),
        text: chapter[verseNum]
      });
    }

    chapters.push({
      chapter: Number(chapterNum),
      verses: verses
    });
  }

  // ✅ FINAL FORMAT
  let formatted = {
    book: bookName,
    version: "KJV",
    chapters: chapters
  };

  let cleanName = bookName.toLowerCase().replace(/\s+/g, "");

  fs.writeFileSync(
    `bible/kjv/${cleanName}.json`,
    JSON.stringify(formatted, null, 2)
  );
}

console.log("✅ PERFECT: All books converted correctly!");
