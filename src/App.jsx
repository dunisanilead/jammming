import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { mockTracks } from './MockData/mockData';
import Playlist from './components/Playlist';
import './App.css'

function App() {
  const [searchResults, setSearchResults] = useState(mockTracks); // holds the track data

  return (
    <div className='main-app'>
      <Header />
      <SearchBar onSearch={setSearchResults} />

      <div className='main'>
        <div className='Search-results'>
          <SearchResults tracks={searchResults} />
        </div>
        <div className='playlist'>
          <Playlist />
        </div>
        
      </div>
      
    </div>
  );
}

export default App;