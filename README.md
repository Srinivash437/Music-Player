# 🎵 Custom Music Player

A clean and fully-featured music player built with **HTML**, **CSS**, and **JavaScript** — designed to provide a smooth and interactive audio playback experience. This project mimics the behavior of modern music players with functionality like shuffle, repeat, volume control, and dynamic playlist display.

---

## 📌 Overview

This project is a **front-end-only** music player application that plays local MP3 files with album artwork. It's designed for personal use, portfolio projects, or as a base for building more advanced music platforms.

---

## 🌟 Key Features

- 🎧 **Play/Pause** individual tracks
- ⏮️ **Previous/Next** navigation
- 📃 **Dynamic Playlist** loaded from an array
- 🕒 **Progress Bar** with current and total time
- 📀 **Track Metadata** (name, artist, cover image)
- 🔉 **Volume Control**
- 🔁 **Playback Modes**:
  - Repeat entire playlist
  - Repeat current song
  - Shuffle
- 📱 **Responsive Layout**
- 🎵 **Load a random song on first load**

---

## ⚙️ Functionality

### ▶️ Music Playback

- Play or pause the current song using the central control button.
- The play/pause button changes icon accordingly.

### ⏩ Song Navigation

- Skip to next or previous songs using the arrow controls.
- Automatically loops to start/end when at boundaries.

### 🎚️ Volume Control

- A slider allows volume adjustment between 0 to 100.
- Uses the HTML5 `<audio>` volume API.

### 📊 Progress Tracking

- Shows current playtime and total duration.
- Users can click the progress bar to seek within the song.

### 🔁 Playback Modes

- Click the loop icon to toggle:
  1. Playlist loop
  2. Single-song loop
  3. Shuffle mode

### 📃 Playlist Panel

- Toggle playlist view using the "more music" icon.
- Clicking a song in the list immediately plays it.
- Shows track title, artist, and duration.

## How to Use

1. **Clone the Repository or Download as ZIP**
   ```bash
   git clone https://github.com/yourusername/custom-music-player.git
   ```
2. **Add Your Music Files**

Place .mp3 songs in the /songs/ folder.

Place corresponding album images in the /images/ folder (as .jpg).

3. **Update the** allMusic **Array in** music-list.js

{
name: "Song Title | Album",
artist: "Artist Name",
img: "filename-without-extension",
src: "filename-without-extension"
}

4. **Open** index.html **in a Browser**

The player loads a random song and you can begin interacting immediately.

## Technologies Used

**HTML5** — semantic structure

**CSS3** — styling & layout

**JavaScript (ES6+)** — DOM manipulation, logic, and events

**Bootstrap Icons** — for player UI icons

## License

This project is open-source and free to use. Feel free to modify and distribute it.
