import './SearchBar.css';

function SearchBar() {
 return (
  <div className='search-container'>

    <div>
     <input type='text' placeholder='Search song'></input>
    </div>
   
    <div>
      <button>
       <label>Search</label>
     </button>
    </div>
   
  </div>
 )
}
export default SearchBar;