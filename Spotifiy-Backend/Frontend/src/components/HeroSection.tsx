import { motion } from "framer-motion";
import { Play, Headphones } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5"
          >
            <Headphones className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              Stream unlimited music
            </span>
          </motion.div>

          <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            Feel the
            <br />
            <span className="text-gradient">rhythm</span> of life
          </h1>

          <p className="mb-8 max-w-lg text-lg text-muted-foreground">
            Discover millions of tracks from artists around the world. Your
            soundtrack, your way.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg">
              <Play className="h-4 w-4 fill-current" />
              Start Listening
            </button>
            <button className="rounded-full border border-border px-8 py-3 font-display text-sm font-semibold text-foreground transition-all hover:bg-secondary">
              Explore Music
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
