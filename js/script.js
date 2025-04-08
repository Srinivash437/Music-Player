// Select and store all necessary DOM elements from the player container
const container = document.querySelector(".player"),
  musicImg = container.querySelector(".img-area img"),
  musicName = container.querySelector(".song-details .name"),
  musicArtist = container.querySelector(".song-details .artist"),
  playpauseBtn = container.querySelector(".play-pause"),
  playpauseIcon = playpauseBtn.querySelector("i"),
  mainAudio = container.querySelector("#main-audio"),
  nextBtn = container.querySelector("#next"),
  prevBtn = container.querySelector("#prev"),
  progressArea = container.querySelector(".progress-area"),
  progressBar = container.querySelector(".progress-bar"),
  volumeSlider = container.querySelector(".volume-slider"),
  musicList = container.querySelector(".music-list"),
  moreMusicBtn = container.querySelector("#more-music"),
  closemoreMusic = container.querySelector("#close");

// Set a random music index when the page loads
let musicIndex = Math.floor(Math.random() * allMusic.length + 1);

// Load initial song and update the music list UI when the window loads
window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingSong();
});

// Load a song’s data into the player
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

// Play the current song
function playMusic() {
  container.classList.add("paused");
  playpauseIcon.classList.remove("bi-play-fill");
  playpauseIcon.classList.add("bi-pause-fill");
  mainAudio.play();
}

// Pause the current song
function pauseMusic() {
  container.classList.remove("paused");
  playpauseIcon.classList.remove("bi-pause-fill");
  playpauseIcon.classList.add("bi-play-fill");
  mainAudio.pause();
}

// Play the next song in the list
function nextMusic() {
  musicIndex++;
  // If the index exceeds the song list, wrap to the beginning
  musicIndex > allMusic.length ? (musicIndex = 1) : musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

// Play the previous song in the list
function prevMusic() {
  musicIndex--;
  // If index is less than 1, go to the last song
  musicIndex < 1 ? (musicIndex = allMusic.length) : musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

// Toggle play/pause state on button click
playpauseBtn.addEventListener("click", () => {
  if (container.classList.contains("paused")) {
    pauseMusic();
  } else {
    playMusic();
  }
});

// Next and previous button event listeners
nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);

// Update progress bar based on current song time
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = container.querySelector(".current-time"),
    musicDuration = container.querySelector(".max-duration");

  // Update total duration when song metadata is loaded
  mainAudio.addEventListener("loadeddata", () => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  // Update current playing time display
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) currentSec = `0${currentSec}`;
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Allow user to seek through the progress bar
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;

  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
});

// Adjust volume based on volume slider input
function setVolume() {
  mainAudio.volume = volumeSlider.value / 100;
}

// Handle repeat, repeat-one, and shuffle modes
const repeatBtn = container.querySelector("#repeat-playlist");

repeatBtn.addEventListener("click", () => {
  if (repeatBtn.classList.contains("bi-repeat")) {
    repeatBtn.classList.replace("bi-repeat", "bi-repeat-1");
    repeatBtn.setAttribute("title", "Song looped");
  } else if (repeatBtn.classList.contains("bi-repeat-1")) {
    repeatBtn.classList.replace("bi-repeat-1", "bi-shuffle");
    repeatBtn.setAttribute("title", "Playback shuffled");
  } else if (repeatBtn.classList.contains("bi-shuffle")) {
    repeatBtn.classList.replace("bi-shuffle", "bi-repeat");
    repeatBtn.setAttribute("title", "Playlist looped");
  }
});

// Handle what happens when a song ends
mainAudio.addEventListener("ended", () => {
  if (repeatBtn.classList.contains("bi-repeat")) {
    nextMusic(); // Play next song
  } else if (repeatBtn.classList.contains("bi-repeat-1")) {
    // Replay current song
    mainAudio.currentTime = 0;
    loadMusic(musicIndex);
    playMusic();
  } else if (repeatBtn.classList.contains("bi-shuffle")) {
    // Play a random song that's not the current one
    let randIndex;
    do {
      randIndex = Math.floor(Math.random() * allMusic.length);
    } while (musicIndex === randIndex + 1);
    musicIndex = randIndex + 1;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
  }
});

// Toggle the visibility of the music list
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
  moreMusicBtn.click();
});

// Generate the music list dynamically from allMusic array
const ulTag = container.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
  let liTag = `<li li-index="${i + 1}">
    <div class="row">
      <span>${allMusic[i].name}</span>
      <p>${allMusic[i].artist}</p>
    </div>
    <audio src="songs/${allMusic[i].src}.mp3"></audio>
    <span class="audio-duration"></span>
  </li>`;

  ulTag.insertAdjacentHTML("beforeend", liTag);

  let li = ulTag.querySelector(`li[li-index="${i + 1}"]`);
  let liAudioTag = li.querySelector("audio");
  let liAudioDurationTag = li.querySelector(".audio-duration");

  // Load duration metadata for each song in the list
  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

// Highlight currently playing song and enable click-to-play
const allLiTags = ulTag.querySelectorAll("li");
function playingSong() {
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".audio-duration");

    // Remove "playing" class from all list items
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
      // Restore original duration text
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    // Highlight the current playing song in the list
    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    // Add click event to play the clicked song
    allLiTags[j].addEventListener("click", function () {
      clicked(this);
    });
  }
}

// Play song when a list item is clicked
function clicked(element) {
  let getLiIndex = parseInt(element.getAttribute("li-index"));
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}
