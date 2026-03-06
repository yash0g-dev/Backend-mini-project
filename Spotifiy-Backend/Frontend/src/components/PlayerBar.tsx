import { Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle,Pause } from "lucide-react";
import {useState} from "react";
const PlayerBar = ({ currentTrack,state,volume,setVolume, onPlayPause, onNext, onPrev,duration,currentTime }) => {
let Percent=((currentTime/duration) * 100);

const formatTime = (sec) => {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-3">
        {/* Track Info */}
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={currentTrack?.image || "#"}
            alt={currentTrack?.title || "Now playing"}
            className="h-12 w-12 rounded-md object-cover bg-gray-300"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {currentTrack?.title || "No track"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {currentTrack?.artist?.Username || "-"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <button className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block">
              <Shuffle className="h-4 w-4" />
            </button>
            <button
              onClick={onPrev}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <SkipBack className="h-4 w-4 fill-current" />
            </button>
            <button
              onClick={() => onPlayPause(state.index)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
            >
            {(state.mode == "play")?(<Pause className="h-4 w-4 fill-current" />):<Play className="h-4 w-4 fill-current"/>}
            </button>
            <button
              onClick={onNext}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <SkipForward className="h-4 w-4 fill-current" />
            </button>
            <button className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block">
              <Repeat className="h-4 w-4" />
            </button>
          </div>
          <div className="flex w-full max-w-md items-center gap-2">
            <span className="text-[10px] text-muted-foreground">{formatTime(currentTime)}</span>
            <div className="h-1 flex-1 border rounded-full bg-secondary">
              <div className={`h-full   rounded-full bg-primary`} style={{width:`${Percent}%`}}/>
            </div>
            <span className="text-[10px] text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden items-center gap-2 md:flex">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
              <div className="h-4  bg-secondary">
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
    </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar; 
