// STEP 3: Create Variables to Store the Token
let accessToken;
let expiresIn;

// STEP 4: Create the Spotify utility object
const Spotify = {
  // This method retrieves the access token from memory or URL
  getAccessToken() {
    const clientId = '86f9620ea930405199cd6a0c6a64a003'; // Replace with your actual Spotify Client ID
    const redirectUri = 'http://127.0.0.1:5173/'; // Replace with your app's redirect URI
    const scope = 'playlist-modify-public';

    // STEP 3: If redirected back with a code, exchange it for an access token
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const codeVerifier = localStorage.getItem('code_verifier');

      return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier
        })
      })
        .then(response => response.json())
        .then(data => {
          accessToken = data.access_token;
          expiresIn = data.expires_in;

          window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');

          return accessToken;
        });
    }

    // If the token is already stored in memory, return it
    if (accessToken) {
      return accessToken;
    }
   
    // Extract access_token and expires_in values from the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    // If both values are present, store and manage the token
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);

      // Set a timeout to clear the access token when it expires
      window.setTimeout(() => accessToken = '', expiresIn * 3600);

      // Remove the token parameters from the URL for security/cleanliness
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    }

    // If no token is found, start PKCE-compliant authorization flow

    // Begin PKCE authorization flow
    const codeVerifier = generateRandomString(128);
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      localStorage.setItem('code_verifier', codeVerifier);

      const authUrl =
        'https://accounts.spotify.com/authorize' +
        '?client_id=' + clientId +
        '&response_type=code' +
        '&redirect_uri=' + encodeURIComponent(redirectUri) +
        '&scope=' + encodeURIComponent(scope) +
        '&code_challenge_method=S256' +
        '&code_challenge=' + codeChallenge;

      window.location = authUrl;
    });
  },

  // Placeholder for saving a playlist (to be implemented later)
  savePlaylist() {
    const token = Spotify.getAccessToken();
    console.log("Using token to save playlist:", token);
    // Implementation for saving the playlist will go here
  },

  async search(term) {
    let accessToken = await Spotify.getAccessToken();

    // If no access token was returned, abort search
    if (!accessToken) return [];

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // If the token is expired or unauthorized, reset and reload
      if (response.status === 401) {
        accessToken = '';
        window.location.reload(); // Trigger re-authentication
        return [];
      }

      const jsonResponse = await response.json();

      if (!jsonResponse.tracks) return [];

      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    } catch (error) {
      console.error("Spotify search error:", error);
      return [];
    }
    
  }
  
};


export default Spotify;


// PKCE Step 1: Generate a code verifier and code challenge
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}