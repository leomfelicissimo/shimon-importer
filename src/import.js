const data = require('./nvi.json');
const fs = require('fs');
const newStructure = [];
if (Array.isArray(data)) {
  const references = data;
  references.forEach(ref => {
    const newReference = {
      abbrev: ref.abbrev,
      book: ref.book,
      chapters: [],
    };

    ref.chapters.forEach(chapterObject => {
      const chapterNumber = Object.keys(chapterObject)[0];
      const verseObject = chapterObject[chapterNumber];
      Object.keys(verseObject).forEach(verseNumber => {
        newReference.chapters.push({
          chapter: chapterNumber,
          verse: verseNumber,
          versions: {
            "NVI": verseObject[verseNumber],
          }
        });
      });
    });

    newStructure.push(newReference);
  });

  fs.writeFileSync(__dirname + '/biblion-nvi.json', JSON.stringify(newStructure));
}
