import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MusicCard from "@/components/MusicCard";
import SectionHeader from "@/components/SectionHeader";
import PlayerBar from "@/components/PlayerBar";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Disc3 } from "lucide-react";

import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

const trending = [
  { image: album1, title: "Void Frequencies", artist: "Echo Chamber" },
  { image: album2, title: "Neon Streets", artist: "Cyber Pulse" },
  { image: album3, title: "Mystic Grove", artist: "Fern & Fog" },
  { image: album4, title: "Liquid Chrome", artist: "Nova Drift" },
  { image: album3, title: "Deep Forest", artist: "Ether Wave" },
  { image: album1, title: "Prism", artist: "Synthwave Co." },
];

const recent = [
  { image: album4, title: "Reflections", artist: "Silver Lake" },
  { image: album2, title: "After Dark", artist: "Night Owl" },
  { image: album1, title: "Geometry", artist: "Abstract Mind" },
  { image: album3, title: "Verdant", artist: "Moss Garden" },
];

const genres = [
  { name: "Electronic", color: "from-cyan-500/20 to-teal-500/20", icon: Disc3 },
  { name: "Hip Hop", color: "from-orange-500/20 to-red-500/20", icon: TrendingUp },
  { name: "Lo-Fi", color: "from-purple-500/20 to-indigo-500/20", icon: Clock },
  { name: "Ambient", color: "from-emerald-500/20 to-green-500/20", icon: Disc3 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      <HeroSection />

      <div className="container mx-auto space-y-16 px-6 py-12">
        {/* Genres */}
        <section>
          <SectionHeader title="Browse Genres" linkTo="/browse" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {genres.map((genre, i) => (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`cursor-pointer rounded-xl border border-border bg-gradient-to-br ${genre.color} p-6 transition-all hover:border-primary/30 hover:shadow-lg`}
              >
                <genre.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {genre.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section>
          <SectionHeader title="Trending Now" linkTo="/browse" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {trending.map((track, i) => (
              <MusicCard key={i} {...track} index={i} />
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section>
          <SectionHeader title="Recently Played" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {recent.map((track, i) => (
              <MusicCard key={i} {...track} index={i} />
            ))}
          </div>
        </section>
      </div>

      <PlayerBar />
    </div>
  );
};

export default Index;
