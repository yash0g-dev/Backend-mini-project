import Navbar from "@/components/Navbar";
import MusicCard from "@/components/MusicCard";
import SectionHeader from "@/components/SectionHeader";
import PlayerBar from "@/components/PlayerBar";
import { Search } from "lucide-react";

import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

const allMusic = [
  { image: album1, title: "Void Frequencies", artist: "Echo Chamber" },
  { image: album2, title: "Neon Streets", artist: "Cyber Pulse" },
  { image: album3, title: "Mystic Grove", artist: "Fern & Fog" },
  { image: album4, title: "Liquid Chrome", artist: "Nova Drift" },
  { image: album3, title: "Deep Forest", artist: "Ether Wave" },
  { image: album1, title: "Prism", artist: "Synthwave Co." },
  { image: album4, title: "Reflections", artist: "Silver Lake" },
  { image: album2, title: "After Dark", artist: "Night Owl" },
];

const Browse = () => {
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

        <section>
          <SectionHeader title="All Music" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {allMusic.map((track, i) => (
              <MusicCard key={i} {...track} index={i} />
            ))}
          </div>
        </section>
      </div>

      <PlayerBar />
    </div>
  );
};

export default Browse;
