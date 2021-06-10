require('dotenv').config()

const express = require('express');
const qs = require('qs')
const path = require('path')
const axios = require('axios')
const app = express()
const { getAccessAndRefreshTokens } = require('./spotifyFunctions')

app.use(express.json())

app.use(express.static(path.join(__dirname, './public')))

app.post('/auth_success', async (req, res, next) => {
  const { code: accessCode } = req.body;
  try {
    const { refreshToken, accessToken } = await getAccessAndRefreshTokens(accessCode);
    console.log('tokens:', accessToken, refreshToken)
    res.send('congrats! spotify is authorized')
  } catch (err) {
    console.log(err)
  }
})

app.post('/playlist', async (req, res, next) => {
  const { emojiPlaylistTitle } = req.body;
  console.log(emojiPlaylistTitle)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

const PORT = 8082;

app.listen(process.env.PORT || PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})
