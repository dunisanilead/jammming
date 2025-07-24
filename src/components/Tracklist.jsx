import Track from './Track';

function Tracklist({ tracks }) {
  if (!tracks || tracks.length === 0) {
    return <div className="tracklist">No tracks available.</div>;
  }

  return (
    <div className="tracklist">
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default Tracklist;