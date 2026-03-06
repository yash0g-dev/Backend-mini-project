import { createContext, useRef, useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {

  const audioRef = useRef(new Audio());

  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  const playSong = (songList, index) => {

    const audio = audioRef.current;

    setSongs(songList);
    setCurrentIndex(index);

    audio.src = songList[index].uri;
    audio.play().catch(()=>{});

    setIsSongPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsSongPlaying(false);
  };

  const playPause = () => {

    const audio = audioRef.current;

    if (audio.paused) {
      audio.play().catch(()=>{});
      setIsSongPlaying(true);
    } else {
      audio.pause();
      setIsSongPlaying(false);
    }

  };

  const nextSong = () => {

    if (!songs.length) return;

    const next = (currentIndex + 1) % songs.length;

    playSong(songs, next);

  };

  const prevSong = () => {

    if (!songs.length) return;

    const prev = (currentIndex - 1 + songs.length) % songs.length;

    playSong(songs, prev);

  };

  const contextValue = {
    audioRef,
    songs,
    currentIndex,
    currentSong: songs[currentIndex],
    playSong,
    pauseSong,
    playPause,
    nextSong,
    prevSong,
    isSongPlaying
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;