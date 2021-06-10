import React from 'react'
import 'regenerator-runtime/runtime'
import axios from 'axios'
import qs from 'qs'
import {useInput} from './customHooks'

/*TO DO:
if code, redirect to playlist creation screen
if error, send to error need to connect screen
*/
const CreatePlaylist = () => {
  const getSpotifyTokens = async (code) => {
    const authResponse = await axios.post('/auth_success', { code });
    return authResponse.data;
  }

  if (window.location.search) {
    const encodedURL = window.location.search.split('?')[1]
    const { code, error }  = qs.parse(encodedURL)
    console.log(code)
    const authResponse = getSpotifyTokens(code);
    console.log(authResponse.data)
  }


  const [emojiPlaylistTitle, setEmojis] = useInput('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('title entered:', emojiPlaylistTitle)
  }

  return (
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
  )
}

export default CreatePlaylist
