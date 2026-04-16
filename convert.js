const fs = require("fs");

// load file
let raw = fs.readFileSync("kjv.json", "utf8");

// remove BOM
raw = raw.replace(/^\uFEFF/, "");

const data = JSON.parse(raw);

// 🔥 IMPORTANT: target books
const booksData = data.books;

// create folder
fs.mkdirSync("bibles/kjv", { recursive: true });

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

  let formatted = {
    name: bookName,
    chapters: chapters
  };

  let cleanName = bookName.replace(/ /g, "");

  fs.writeFileSync(
    `bibles/kjv/${cleanName}.json`,
    JSON.stringify(formatted, null, 2)
  );
}

console.log("✅ All books created separately!");
