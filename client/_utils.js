import qs from 'qs'

const scopes = qs.stringify({
    scope: 'user-read-recently-played user-top-read playlist-modify-public'
})

const REDIRECT_URI = 'http://localhost:8082/create'
const SPOTIFY_CLIENT_ID = 'e5c19d128a1e464fa9ce4f8701d8be90'
export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&${scopes}`
