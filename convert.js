const fs = require("fs");

// load file
let raw = fs.readFileSync("kjv.json", "utf8");

// remove BOM
raw = raw.replace(/^\uFEFF/, "");

const data = JSON.parse(raw);

// ✅ your file is an ARRAY of books
fs.mkdirSync("bible/kjv", { recursive: true });

data.forEach((bookObj) => {

  let chapters = [];

  bookObj.chapters.forEach((ch) => {

    let verses = [];

    ch.verses.forEach((v) => {
      verses.push({
        verse: Number(v.verse),
        text: v.text
      });
    });

    chapters.push({
      chapter: Number(ch.chapter),
      verses: verses
    });

  });

  // ✅ CORRECT FORMAT
  let formatted = {
    book: bookObj.name,     // NOT number
    version: "KJV",
    chapters: chapters
  };

  // clean filename
  let cleanName = bookObj.name.toLowerCase().replace(/\s+/g, "");

  fs.writeFileSync(
    `bible/kjv/${cleanName}.json`,
    JSON.stringify(formatted, null, 2)
  );

});

console.log("✅ FIXED: All books now correct format!");
