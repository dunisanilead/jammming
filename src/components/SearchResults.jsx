import './SearchResults.css'
import Tracklist from './Tracklist';

function SearchResults({tracks}) {

 return (
  <div className='search-results'>
    
      <h1>Results</h1>
      <Tracklist tracks={tracks} />
    
  </div>
 )
}
export default SearchResults;