import { Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from "lucide-react";
import album1 from "@/assets/album-1.jpg";

const PlayerBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-3">
        {/* Track Info */}
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={album1}
            alt="Now playing"
            className="h-12 w-12 rounded-md object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              Midnight Echo
            </p>
            <p className="truncate text-xs text-muted-foreground">Nova Drift</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <button className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block">
              <Shuffle className="h-4 w-4" />
            </button>
            <button className="text-muted-foreground transition-colors hover:text-foreground">
              <SkipBack className="h-4 w-4 fill-current" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105">
              <Play className="h-4 w-4 fill-current" />
            </button>
            <button className="text-muted-foreground transition-colors hover:text-foreground">
              <SkipForward className="h-4 w-4 fill-current" />
            </button>
            <button className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block">
              <Repeat className="h-4 w-4" />
            </button>
          </div>
          <div className="flex w-full max-w-md items-center gap-2">
            <span className="text-[10px] text-muted-foreground">1:23</span>
            <div className="h-1 flex-1 rounded-full bg-secondary">
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
            <span className="text-[10px] text-muted-foreground">3:45</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden items-center gap-2 md:flex">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <div className="h-1 w-24 rounded-full bg-secondary">
            <div className="h-full w-2/3 rounded-full bg-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
