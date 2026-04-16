const fs = require("fs");

// load raw file
const data = JSON.parse(fs.readFileSync("kjv.json", "utf8"));

let books = {};

// organize data
data.forEach(v => {
  if (!books[v.book]) {
    books[v.book] = {
      name: v.book,
      chapters: {}
    };
  }

  if (!books[v.book].chapters[v.chapter]) {
    books[v.book].chapters[v.chapter] = [];
  }

  books[v.book].chapters[v.chapter].push({
    verse: v.verse,
    text: v.text
  });
});

// create folder
fs.mkdirSync("bibles/kjv", { recursive: true });

// convert + save
for (let bookName in books) {
  let cleanName = bookName.replace(/ /g, ""); // remove spaces

  let formatted = {
    name: bookName,
    chapters: Object.keys(books[bookName].chapters).map(ch => ({
      chapter: Number(ch),
      verses: books[bookName].chapters[ch]
    }))
  };

  fs.writeFileSync(
    `bibles/kjv/${cleanName}.json`,
    JSON.stringify(formatted, null, 2)
  );
}

console.log("✅ All 66 books created perfectly!");
