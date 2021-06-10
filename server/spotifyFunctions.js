require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

const getAccessAndRefreshTokens = async (accessCode) => {
  try {
    const authQueryString = qs.stringify({
      grant_type: 'authorization_code',
      code: accessCode,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    });

    const { data: { refresh_token: refreshToken, access_token: accessToken } } = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: authQueryString
    });

    return { refreshToken, accessToken }

  } catch (err) {
    console.log('Failed to fetch tokens:', err)
  }
};


module.exports = {
  getAccessAndRefreshTokens,
}
