import React, { useState } from "react";
import "./MusicPlayer.css";

const initialSongs = [
  {
    title: "Song 1",
  },
  {
    title: "Song 2",
  },
  {
    title: "Song 3",
  },
  {
    title: "Song 4",
  },
  {
    title: "Song 5",
  },
];

const MusicPlayer = () => {
  const [songs, setSongs] = useState(initialSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const [newSong, setNewSong] = useState("");

  const handleNextSong = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };
  const handlePrevSong = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  const handleJumpToSong = (index) => {
    setCurrentSongIndex(index);
  };
  const handleRemoveSong = (indexToRemove) => {
    if (indexToRemove === currentSongIndex) {
      if (songs.length === 1) {
        setCurrentSongIndex(null);
      } else {
        setCurrentSongIndex((prevIndex) => prevIndex % (songs.length - 1));
      }
    } else if (indexToRemove < currentSongIndex) {
      setCurrentSongIndex((prevIndex) => prevIndex - 1);
    }

    setSongs(songs.filter((_, index) => index !== indexToRemove));
  };

  const handleAddSong = () => {
    if (newSong.trim() === "") return;
    const newSongObject = {
      title: newSong,
    };
    setSongs([...songs, newSongObject]);
    setNewSong("");
  };

  return (
    <div className="container">
      <div classNAme="music-player-card">
        <h2> Now Playing</h2>

        <div className="current-song-display">
            {songs.length >0 && currentSongIndex!==null ?songs[currentSongIndex].title : 'No song selected'}       
        </div>
        <div className="navigation-controls">
        <button onClick={handlePrevSong} disabled={songs.length === 0}> Previous</button>
        <button onClick={handleNextSong} disabled={songs.length === 0}> Next</button>
        </div>
      </div>

      <div className='playlist-card'>
        <h2> Playlist</h2>
        <div className='add-song-form'>
            <input type='text'value={newSong}
            onChange={(e)=>{
                setNewSong(e.target.value);
            }} placeholder="Enter a new song title" />
            <button onClick={handleAddSong}>Add Song</button>
        </div>
        <ul className='playlist'>
            {songs.map((songs,index)=>(
                <li key={index} className={index ===currentSongIndex ?'active': ''}>
                    <span className='song-title'onClick={
                        ()=>{
                            handleJumpToSong(index);
                        }
                    }>{songs.title}</span>
                    <button className="remove-btn" onClick={() => handleRemoveSong(index)}>Remove</button>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
