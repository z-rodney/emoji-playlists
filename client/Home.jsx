import React from 'react'
import { Redirect } from 'react-router-dom'
import { SPOTIFY_AUTH_URL } from './_utils'

const Home = () => {
  const redirectToAuth = () => {
    window.location.href = SPOTIFY_AUTH_URL
  }

  return (
    /*redirectToAuth ?
      <>
        <Redirect to={SPOTIFY_AUTH_URL}/>
      </>
      :*/
    <div>
      <h1>Emojify your spotify playlists!</h1>
      <p>In order to create a spotify playlist, this app needs permissions to access:</p>
      <ul>
        <li>Your playlists</li>
        <li>Your top artists and songs</li>
        <li>Your recently played songs</li>
      </ul>
      <button onClick={() => redirectToAuth()}>I want to authorize spotify</button>
    </div>
  )
}

export default Home
