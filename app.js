// Lista de canciones (inicialmente vacía)
let songs = [
  // Ejemplo: { title: "Mi Canción", url: "https://tu-dominio.com/music/cancion1.mp3" }
];

// Genera la lista en el HTML
const playlistEl = document.getElementById("playlist");
const player = document.getElementById("player");

function renderPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => playSong(index));
    playlistEl.appendChild(li);
  });
}

function playSong(index) {
  player.src = songs[index].url;
  player.play();
}

// Inicializa lista
renderPlaylist();

// Mensaje simple para subida
const uploadForm = document.getElementById("uploadForm");
const uploadMsg = document.getElementById("uploadMsg");

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(uploadForm);
  
  fetch(uploadForm.action, {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(msg => {
    uploadMsg.textContent = msg;
    uploadForm.reset();
  })
  .catch(err => {
    uploadMsg.textContent = "Error subiendo archivo.";
    console.error(err);
  });
});
