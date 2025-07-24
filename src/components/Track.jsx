import './Track.css'


function Track({track}) {
 return (
  <div className='track'>
    
    <div className='song-details'>
    <div> <img src={track.image} alt={track.name} /></div>
       <div className='song-name'>
         <h4>{track.name}</h4>
       </div>
       <div className='artist'>
          <p>{track.artist}</p>
       </div> 
    </div>
    <div className='btn'>
      <button className='add'><label>add</label></button>
    </div>
  </div> 
 )
}

export default Track;