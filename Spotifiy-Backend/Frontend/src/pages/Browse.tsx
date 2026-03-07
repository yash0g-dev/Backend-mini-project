import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import PlayerBar from "@/components/PlayerBar";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const Browse = () => {
  const [allMusic, setAllMusic] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [state , setState] = useState({state:"pause",index:0});
  const [volume , setVolume] = useState(100);
// Track progress state
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

// Track progress state
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

  // Audio player state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
  const audio = audioRef.current;

  const handleLoadedMetadata = () => {
    setDuration(audio.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  audio.addEventListener("loadedmetadata", handleLoadedMetadata);
  audio.addEventListener("timeupdate", handleTimeUpdate);

  return () => {
    audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    audio.removeEventListener("timeupdate", handleTimeUpdate);
  };
}, []);

  // Fetch music from backend
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/music/", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const artistMusic = res.data.music.filter(
          (item) => item.artist?.role === "artist"
        );

        if (artistMusic.length > 0) setAllMusic(artistMusic);
      } catch (err) {
        console.error("Failed to fetch music:", err);
      }
    };

    fetchMusic();
  }, []);

  // Handle clicking a track in the grid
  const handlePlay = (index) => {
    const audio = audioRef.current;

    if (currentTrackIndex === index) {
      // toggle play/pause
      if (!audio.paused) {
        audio.pause();
        setState((prev) => ({...prev,mode:"pause"}))
      }
      else {audio.play().catch(() => {}); setState((prev) => ({...prev,mode:"play"}));}
      if (!audio.paused) audio.pause();
      else audio.play().catch(() => {});
    } else {
      audio.src = allMusic[index].uri;
      audio.play().catch(() => {});
      setCurrentTrackIndex(index);
    }
  };

  // Play next track
  const handleNext = () => {
    if (currentTrackIndex === null || allMusic.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % allMusic.length;
    audioRef.current.src = allMusic[nextIndex].uri;
    audioRef.current.play().catch(() => {});
    setCurrentTrackIndex(nextIndex);
  };

  // Play previous track
  const handlePrev = () => {
    if (currentTrackIndex === null || allMusic.length === 0) return;
    const prevIndex =
      (currentTrackIndex - 1 + allMusic.length) % allMusic.length;
    audioRef.current.src = allMusic[prevIndex].uri;
    audioRef.current.play().catch(() => {});
    setCurrentTrackIndex(prevIndex);
  };

  // Play previous track
  const handlePrev = () => {
    if (currentTrackIndex === null || allMusic.length === 0) return;
    const prevIndex =
      (currentTrackIndex - 1 + allMusic.length) % allMusic.length;
    audioRef.current.src = allMusic[prevIndex].uri;
    audioRef.current.play().catch(() => {});
    setCurrentTrackIndex(prevIndex);
  };

useEffect(() => {
  if(audioRef){
    audioRef.current.volume = volume/100;
  }
},[volume])

  return (
    <div className="min-h-screen bg-background pb-24 pt-24">
      <Navbar />

      <div className="container mx-auto space-y-10 px-6">
        {/* Search */}
        <div className="relative mx-auto max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search songs, albums, artists..."
            className="w-full rounded-full border border-border bg-secondary py-3 pl-12 pr-6 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Upload Music Section */}
        <div className="">
          <button
            onClick={() => setShowModal(true)}
            className="rounded bg-primary py-2 px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Upload File
          </button>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary rounded-2xl p-6 w-full max-w-md shadow-lg"
              >
                {/* Your existing form code */}
              </motion.div>
            </div>
          )}
        </div>

        {/* Music Grid */}
        <section
        <section>
          <SectionHeader title="All Music" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {allMusic.map((track, i) => (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => handlePlay(i)}
              >
                {/* Placeholder image */}
                <img
                  src="#"
                  alt={track.title}
                  className="rounded-lg mb-2 w-full h-40 object-cover bg-gray-300"
                />
                <div className="text-sm text-foreground">
                  <p className="font-semibold">{track.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {track.artist.Username}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Refactored Spotify-like PlayerBar */}
      <PlayerBar
        currentTrack={currentTrackIndex !== null ? allMusic[currentTrackIndex] : null}
        onPlayPause={handlePlay}
        state={state}
        onPlayPause={() => {
          const audio = audioRef.current;
          if (!audio.paused) audio.pause();
          else audio.play().catch(() => {});
        }}
        onNext={handleNext}
        onPrev={handlePrev}
    currentTime={currentTime}
  duration={duration}
  volume={volume}
  setVolume ={setVolume}
      />
    </div>
  );
};

export default Browse;
