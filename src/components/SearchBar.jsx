import './SearchBar.css';
import { useState } from 'react';

function SearchBar({onSearch}) {
 const [term, setTerm] = useState('');

 const handleSubmit = (e) => {
   e.preventDefault();
   onSearch(term);
 };

 return (
  <form className='search-container' onSubmit={handleSubmit}>
    <div>
     <input 
       type="text" 
       value={term}
       onChange={(e) => setTerm(e.target.value)} 
     />
    </div>
   
    <div>
      <button type="submit">
       <label>Search</label>
     </button>
    </div>
  </form>
 )
}
export default SearchBar;