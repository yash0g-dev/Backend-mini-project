import { Play, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface MusicCardProps {
  image: string;
  title: string;
  artist: string;
  index?: number;
}

const MusicCard = ({ image, title, artist, index = 0 }: MusicCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
          </div>
        </div>
        <button className="absolute right-3 top-3 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <h3 className="truncate font-display text-sm font-semibold text-foreground">
        {title}
      </h3>
      <p className="truncate text-xs text-muted-foreground">{artist}</p>
    </motion.div>
  );
};

export default MusicCard;
