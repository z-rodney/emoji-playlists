import React from 'react'
import qs from 'qs'

const CreatePlaylist = () => {
  if (window.location.search) {
    const encodedURL = window.location.search.split('?')[1]
    const { code, error }  = qs.parse(encodedURL)
    console.log(code)
  }
  return (
    <div>
      <h2>Create a Playlist</h2>
      <form>
        <input placeholder="enter emojis here"></input>
      </form>
    </div>
  )
}

export default CreatePlaylist
