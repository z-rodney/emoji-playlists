import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import axios from 'axios'
import qs from 'qs'
import {useInput} from './customHooks'

/*TO DO:
handle old access code error
*/
const CreatePlaylist = () => {
  const [emojiPlaylistTitle, setEmojis] = useInput('');
  const [spotifyAccessCode, setAccessCode] = useState('');
  const [spotifyAccessError, setAccessError] = useState('');

  useEffect(() => {
    if (window.location.search) {
      const encodedURL = window.location.search.split('?')[1]
      const { code, error } = qs.parse(encodedURL)
      setAccessCode(code);
      if (error) {
        setAccessError(error);
      }
      console.log('access code:', spotifyAccessError)
    }
  }, [spotifyAccessCode, spotifyAccessError])

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await axios.post('/playlist', {
      spotifyAccessCode,
      emojiPlaylistTitle
    })
    console.log(response.data)
  }

  return spotifyAccessError ?
    <div>
      <h2>Something went wrong :(</h2>
      <p>We need access to your spotify account in order to create a playlist. Something went wrong and we could not get the access needed.
      </p>
    </div>
    :
    <div>
      <h2>Create a Playlist</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emoji-title">Emoji Playlist Title</label>
        <input
          id="emoji-title"
          value={emojiPlaylistTitle}
          name="emojiTitle"
          placeholder="enter emojis here"
          onChange={setEmojis}>
        </input>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
}

export default CreatePlaylist
