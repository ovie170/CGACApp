const fs = require("fs");

const raw = fs.readFileSync("kjv_fixed.json", "utf8");
const data = JSON.parse(raw);

fs.mkdirSync("bibles/kjv", { recursive: true });

for (let bookName in data) {
  let chapters = [];

  for (let chapterNum in data[bookName]) {
    let verses = [];

    for (let verseNum in data[bookName][chapterNum]) {
      verses.push({
        verse: Number(verseNum),
        text: data[bookName][chapterNum][verseNum]
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

console.log("✅ DONE!");
