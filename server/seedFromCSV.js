const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const iconv = require('iconv-lite')
const { emojiDictionary, EmojiDictItem } = require('./emojiDictionary');

const fileHeaders = ['artistGID', 'artistName', 'emoji', 'emojiName', 'trackURI', 'emojiFilter', 'genreFilter', 'artistGenres', 'trackName', 'emojiRank', 'scaledRank', 'overallRank']
//const results = [];
const csvFilePath = path.resolve('..', 'Artists_Top_10_Emoji_Table_Full_Data_data.csv')
fs.createReadStream(csvFilePath)
  .pipe(iconv.decodeStream('utf16le'))
  .pipe(iconv.encodeStream('utf8'))
  .pipe(csv({separator: '\t', headers: fileHeaders}))
  .on('data', (row) => {
    const { emoji, emojiName: emojiDescription, artistName, artistGenres } = row;
    if (!emojiDictionary[emoji]) {
      emojiDictionary[emoji] = new EmojiDictItem(emojiDescription)
    }
    emojiDictionary[emoji].addArtist(artistName);
    artistGenres.split(', ').forEach(genre => {
      emojiDictionary[emoji].addGenre(genre)
    })
    //results.push(row)
  })
  .on('end', () => {
    console.log('updated emoji dictionary', emojiDictionary)
  });

  //['artistGID', 'artistName', 'emoji', 'emojiName', 'trackURI', 'emojiFilter', 'genreFilter', 'artistGenres', 'trackName', 'emojiRank', 'scaledRank', 'overallRank']

/*const data = fs.readFileSync(csvFilePath, 'utf16le')
console.log(data)*/
