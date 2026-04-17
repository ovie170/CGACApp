const fs = require("fs");
const path = require("path");

// load kjv.json
const data = JSON.parse(fs.readFileSync("kjv.json", "utf-8"));

// output folder
const outputDir = path.join(__dirname, "bibles", "kjv");

// create folder if not exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// loop through books
data.books.forEach(book => {
  const bookName = book.name;

  const newBook = {
    book: bookName,
    chapters: book.chapters
  };

  const filePath = path.join(outputDir, `${bookName}.json`);

  fs.writeFileSync(filePath, JSON.stringify(newBook, null, 2));

  console.log(`✅ Created: ${bookName}.json`);
});

console.log("🎉 All books converted!");
