import React from 'react';
import Tracklist from './Tracklist';

function Playlist({name, tracks,onRemove, onChangeName, onSave, isSaving,saveMessage}) {
  return (
    <div className="Playlist">
     <div>
      <input
        type="text" 
        value={name} 
        onChange={(e) => onChangeName(e.target.value)}
      />

      <Tracklist tracks={tracks} onRemove={onRemove} />

     </div>
     
    <div>
      <button className="Playlist-save" onClick={onSave}>
        Save To Spotify
      </button>
    </div>
    {isSaving && <p>Saving...</p>}
    {saveMessage && <p>{saveMessage}</p>}
      
    </div>
  );
}

export default Playlist;