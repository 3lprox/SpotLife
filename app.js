// ===== CONFIGURACIÓN =====
const CLIENT_ID = '10aada59823943c49cd7cef01f36de4d'; // tu Client ID
const REDIRECT_URI = 'https://3lprox.github.io/spotlife/'; // cambia esto a tu GitHub Pages
const SCOPES = 'user-read-private user-read-email';

// ===== ELEMENTOS =====
const loginBtn = document.getElementById('login-btn');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

let accessToken = null;

// ===== FUNCIONES =====
function getTokenFromUrl() {
  const hash = window.location.hash;
  if(!hash) return null;
  const params = new URLSearchParams(hash.substring(1));
  return params.get('access_token');
}

function redirectToSpotifyLogin() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
  window.location = authUrl;
}

async function searchTrack(query) {
  if(!accessToken) return alert('Debes iniciar sesión primero.');
  const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
    headers: { Authorization: 'Bearer ' + accessToken }
  });
  const data = await res.json();
  renderResults(data.tracks.items);
}

function renderResults(tracks) {
  resultsDiv.innerHTML = '';
  tracks.forEach(track=>{
    const div = document.createElement('div');
    div.className = 'track-card';
    div.innerHTML = `
      <img src="${track.album.images[0]?.url || ''}" alt="Portada">
      <div>${track.name}</div>
      <div style="font-size:12px;color:#9fb0d6">${track.artists.map(a=>a.name).join(', ')}</div>
    `;
    div.addEventListener('click', ()=>{
      playTrack(track);
    });
    resultsDiv.appendChild(div);
  });
}

function playTrack(track){
  if(!track.preview_url) return alert('No hay preview disponible para esta canción.');
  audio.src = track.preview_url;
  audio.play();
  cover.src = track.album.images[0]?.url || '';
  trackTitle.textContent = track.name;
  trackArtist.textContent = track.artists.map(a=>a.name).join(', ');
}

// ===== EVENTOS =====
loginBtn.addEventListener('click', redirectToSpotifyLogin);

searchInput.addEventListener('keypress', e=>{
  if(e.key==='Enter') searchTrack(searchInput.value);
});

// ===== INICIO =====
window.onload = ()=>{
  const token = getTokenFromUrl();
  if(token){
    accessToken = token;
    window.history.pushState("", "", REDIRECT_URI); // limpia hash
    loginBtn.style.display='none';
  }
}

