let apiKey = 'a940a6bc910e6f94bd3107971e9db39f';

function searchArtist() {
  let searchInp = document.getElementById('search-input');
  let artistName = searchInp.value;
  searchInp.value = '';
  getArtistInfo(artistName).then(displayArtistInfo);
}

function getArtistInfo(artistName) {
  let apiUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`;
  return fetch(apiUrl).then(function(response) {
    return response.json();
  }).then(function(data) {
    return data.artist;
  });

}
function getTopTrack(artistName) {
  let apiUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${apiKey}&format=json`;
  return fetch(apiUrl).then(function(response) {
    return response.json();
  }).then(function(data) {
    return data.toptracks.track[0];
  });
}
function displayArtistInfo(artistInfo) {
  let artistInfoContainer = document.getElementById('artist-info');
  artistInfoContainer.innerHTML = '';

  let artistName = document.createElement('h2');
  artistName.textContent = artistInfo.name;

  let artistImage = document.createElement('img');
  const imageUrl = artistInfo.image[3]['#text'];
  const hasValidExtension = imageUrl.match(/\.(jpg|jpeg|png|gif)$/i);
  
  if (hasValidExtension) {
    artistImage.src = imageUrl;
  } else {
    artistImage.src = 'https://via.placeholder.com/150'; // Placeholder image (150x150 pixels)
  }
  artistImage.alt = artistInfo.name;
  artistImage.width = 150;
  artistImage.height = 150;

  let artistBio = document.createElement('p');
  artistBio.innerHTML = artistInfo.bio.summary;

  let topTracks = document.createElement('ul');
  artistInfo.toptracks.track.forEach(function(track) {
    let trackItem = document.createElement('li');
    let trackLink = document.createElement('a');
    trackLink.textContent = track.name;
    trackLink.href = track.url;
    trackLink.target = '_blank';
    trackItem.appendChild(trackLink);
    topTracks.appendChild(trackItem);
    
    // Add the audio player for the first track
    if (!document.getElementById('audio-player').src) {
      let audioPlayer = document.getElementById('audio-player');
      let trackUrl = track.url + '/stream?api_key=' + apiKey;
      audioPlayer.src = trackUrl;
    }
  });

  artistInfoContainer.insertAdjacentElement('beforeend', artistName);
  artistInfoContainer.insertAdjacentElement('beforeend', artistImage);
  artistInfoContainer.insertAdjacentElement('beforeend', artistBio);
  artistInfoContainer.insertAdjacentElement('beforeend', topTracks);
  setTimeout(() => {
    artistInfoContainer.classList.add('fade-in');
  }, 200);
}


function displayArtistInfo(artistInfo) {
  let artistInfoContainer = document.getElementById('artist-info');
  artistInfoContainer.innerHTML = '';

  let artistName = document.createElement('h2');
  artistName.textContent = artistInfo.name;

  // let artistImage = document.createElement('img');
  // if (artistInfo.image[2]['#text']) {
  //   artistImage.src = artistInfo.image[2]['#text'];
  // } else {
  //   artistImage.src = 'https://via.placeholder.com/150'; // Placeholder image (150x150 pixels)
  // }

  // artistImage.alt = artistInfo.name;
  // artistImage.width = 150;
  // artistImage.height = 150;
  let artistImage = document.createElement('img');
  const imageUrl = artistInfo.image[3]['#text'];
  const hasValidExtension = imageUrl.match(/\.(jpg|jpeg|png|gif)$/i);
  
  if (hasValidExtension) {
    artistImage.src = imageUrl;
  } else {
    artistImage.src = 'https://via.placeholder.com/150'; // Placeholder image (150x150 pixels)
  }
  artistImage.alt = artistInfo.name;
  artistImage.width = 150;
  artistImage.height = 150;

  let artistBio = document.createElement('p');
  artistBio.innerHTML = artistInfo.bio.summary;

  artistInfoContainer.insertAdjacentElement('beforeend', artistName);
  artistInfoContainer.insertAdjacentElement('beforeend', artistImage);
  artistInfoContainer.insertAdjacentElement('beforeend', artistBio);
  setTimeout(() => {
    artistInfoContainer.classList.add('fade-in');
  }, 200);
}


document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  searchArtist();
});

