import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import './App.css'
import Spotify from './util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Summer Vibes");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const savePlaylist = async () => {
  const trackUris = playlistTracks.map(track => track.uri);

  if (!trackUris.length || !playlistName) return;

  setIsSaving(true);
  setSaveMessage('');

  try {
    await Spotify.savePlaylist(playlistName, trackUris);
    setSaveMessage('Playlist saved to Spotify!');
    setPlaylistTracks([]);
    setPlaylistName('New Playlist');
  } catch (error) {
    setSaveMessage('Error saving playlist.');
    console.error(error);
  } finally {
    setIsSaving(false);
  }
    // Reset
    setPlaylistTracks([]);
    setPlaylistName("New Playlist");
  };

  const addTrackToPlaylist = (track) => {
    //if (playlist already has a track with the same id){}
    if (!playlistTracks.some((t) => t.id === track.id)) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track])
    }
  }

    const removeTrackFromPlaylist = (track) => {
      if (playlistTracks.some((t) => t.id === track.id)) {
        // fill in here
        setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id))
      }
    }

    const search = async (term) => {
      const results = await Spotify.search(term);
      setSearchResults(results);
    };

  return (
    <div className='main-app'>
      <Header />
      <SearchBar onSearch={search} />

      <div className='main'>
        <div className='Search-results'>
          < SearchResults 
            tracks={searchResults} 
            onAdd={addTrackToPlaylist}
          /> 
        </div>

        <div className='playlist'>
          <Playlist 
            name={playlistName}
            onChangeName={setPlaylistName}
            tracks={playlistTracks}
            onRemove={removeTrackFromPlaylist}
            onSave={savePlaylist}
            isSaving={isSaving}
            saveMessage={saveMessage}
          />
        </div>
      </div>
      
    </div>
  );
}

export default App;