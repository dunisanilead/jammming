import React from 'react';
import Tracklist from './Tracklist';

function Playlist() {
  return (
    <div className="Playlist">
     <div>
      <h1>Playlist</h1>
     </div>
     
    <div>
      <button className="Playlist-save">
        Save To Spotify
      </button>
    </div>
      
    </div>
  );
}

export default Playlist;