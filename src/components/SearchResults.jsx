import './SearchResults.css'
import Tracklist from './Tracklist';


function SearchResults({tracks, onAdd}) {

 return (
  <div className='search-results'>
      <h1>Results</h1>
      <Tracklist tracks={tracks} onAdd={onAdd}/>
  </div>
 )
}
export default SearchResults;