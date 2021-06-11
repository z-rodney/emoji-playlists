require('dotenv').config()

const express = require('express');
const qs = require('qs')
const path = require('path')
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
  try {
    const { spotifyAccessCode, emojiPlaylistTitle } = req.body;
    const { refreshToken, accessToken } = await getAccessAndRefreshTokens(spotifyAccessCode);
    /*TO-DO: create playlist from bpm function,
    pass emoji title and accesstoken into function */
    console.log('received request, heres what i have:', accessToken, refreshToken, emojiPlaylistTitle);
    res.send('Ok')
  } catch (err) {
    /*TO-DO: move custom error logging to custom error handler */
    console.log(err);
    if (err.message === 'Authorization code expired') {
      return res.send('expired')
    }
    next(err);
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.use((req, res, next) => {
  res.status(404).send(`Uh-Oh, page not found`)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
})

const PORT = 8082;

app.listen(process.env.PORT || PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})
