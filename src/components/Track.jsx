import './Track.css'


function Track({track, onAdd, onRemove}) {

 return (
  <div className='track'>
    
    <div className='song-details'>
       <div>
         <img src={track.image} alt={track.name} />
       </div>

       <div className='song-name'>
         <h4>{track.name}</h4>
       </div>

       <div className='artist'>
          <p>{track.artist}</p>
       </div>

    </div> 

    <div className='btn'>
        {onAdd && (
          <button onClick={() => onAdd(track)}>+</button>
        )}
        
        {onRemove && (
          <button onClick={() => onRemove(track)}>-</button>
        )}
      </div>
  </div> 
 )
}

export default Track;