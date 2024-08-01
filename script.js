document.addEventListener("DOMContentLoaded", () => {
    const playlistsContainer = document.getElementById("playlists-container");
    const modal = document.getElementById("playlist-modal");
    const closeModal = document.querySelector(".close");
    const playlistDetails = document.getElementById("playlist-details");

    // Function to render playlists
    function renderPlaylists() {
        playlistsContainer.innerHTML = "";
        data.playlists.forEach(playlist => {
            const playlistDiv = document.createElement("div");
            playlistDiv.className = "playlist";
            playlistDiv.innerHTML = `
                <img src="${playlist.playlist_art}" alt="${playlist.playlist_name}">
                <h3>${playlist.playlist_name}</h3>
                <p>By: ${playlist.playlist_creator}</p>
                <p>Likes: <span class="like-count">${playlist.likeCount}</span></p>
                <span class="like">&#x2764;</span>
            `;

            playlistDiv.querySelector(".like").addEventListener("click", (event) => {
                event.stopPropagation();
                playlist.likeCount++;
                playlistDiv.querySelector(".like-count").textContent = playlist.likeCount;
            });

            playlistDiv.addEventListener("click", () => {
                displayPlaylistDetails(playlist);
                modal.style.display = "block";
            });

            playlistsContainer.appendChild(playlistDiv);
        });
    }

    // Function to display playlist details in modal
    function displayPlaylistDetails(playlist) {
        playlistDetails.innerHTML = `
            <img src="${playlist.playlist_art}" alt="${playlist.playlist_name}" style="width: 100%; border-radius: 10px;">
            <h2>${playlist.playlist_name}</h2>
            <p>By: ${playlist.playlist_creator}</p>
            <button id="shuffle">Shuffle Songs</button>
            <ul id="songs-list">
                ${playlist.songs.map(song => `
                    <li>
                        <img src="${song.cover_art}" alt="${song.title}" style="width: 50px; height: 50px;">
                        <p>${song.title} - ${song.artist} (${song.duration})</p>
                    </li>
                `).join('')}
            </ul>
        `;

        document.getElementById("shuffle").addEventListener("click", () => {
            shuffleSongs(playlist.songs);
            displayPlaylistDetails(playlist);
        });
    }

    // Function to shuffle songs
    function shuffleSongs(songs) {
        for (let i = songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [songs[i], songs[j]] = [songs[j], songs[i]];
        }
    }

    // Event listeners for closing the modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Initial render of playlists
    renderPlaylists();
});
