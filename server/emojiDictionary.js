/*
  'emoji': {
    description: '',
    moods: [],
    bpm: [],
    genres: [],
    artists: []
  }
*/

class EmojiDictItem {
  constructor(description = '') {
    this.description = description,
    this.moods = [],
    this.bpm = [],
    this.genres = new Set(),
    this.artists = new Set()
  }

  addDescription(description) {
    if (!this.description) {
      this.description = description
    }
  }

  addArtist(artist) {
    if (!this.artists.has(artist)) {
      this.artists.add(artist)
    }
  }

  addGenre(genre) {
    if (!this.genres.has(genre)) {
      this.genres.add(genre)
    }
  }
}


const emojiDictionary = {}

module.exports = { emojiDictionary, EmojiDictItem };
