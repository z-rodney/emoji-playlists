require('dotenv').config()

const express = require('express');
const qs = require('qs')
const path = require('path')
const app = express()
const axios = require('axios')

app.use(express.static(path.join(__dirname, './public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/auth_success', async (req, res, next) => {
  const { code: accessCode } = req.body
  try {
    const authResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }, data: qs.stringify({
        grant_type: 'authorization_code',
        code: accessCode,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      })
    })
    console.log(authResponse.data)
    res.send('congrats! spotify is authorized')
  } catch (err) {
    console.log(err)
  }
})

const PORT = 8082;

app.listen(process.env.PORT || PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})
