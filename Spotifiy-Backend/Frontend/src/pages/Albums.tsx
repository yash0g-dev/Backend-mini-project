import Navbar from "@/components/Navbar";
import PlayerBar from "@/components/PlayerBar";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

const albums = [
  { image: album1, title: "Void Frequencies", artist: "Echo Chamber", tracks: 12 },
  { image: album2, title: "Neon Streets", artist: "Cyber Pulse", tracks: 8 },
  { image: album3, title: "Mystic Grove", artist: "Fern & Fog", tracks: 10 },
  { image: album4, title: "Liquid Chrome", artist: "Nova Drift", tracks: 14 },
  { image: album3, title: "Deep Forest EP", artist: "Ether Wave", tracks: 5 },
  { image: album1, title: "Prism Deluxe", artist: "Synthwave Co.", tracks: 16 },
];

const Albums = () => {
  return (
    <div className="min-h-screen bg-background pb-24 pt-24">
      <Navbar />

      <div className="container mx-auto space-y-10 px-6">
        <SectionHeader title="Albums" />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {albums.map((album, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative mb-3 overflow-hidden rounded-lg">
                <img
                  src={album.image}
                  alt={album.title}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                    <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
                  </div>
                </div>
              </div>
              <h3 className="truncate font-display text-sm font-semibold text-foreground">
                {album.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {album.artist} · {album.tracks} tracks
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <PlayerBar />
    </div>
  );
};

export default Albums;
