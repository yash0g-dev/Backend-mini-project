import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Music, Mail, Lock, User } from "lucide-react";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="mb-6 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              Wav<span className="text-gradient">ify</span>
            </span>
          </Link>
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
            Create account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start your music journey today
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="w-full rounded-lg border border-border bg-secondary py-3 px-4 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="user">Listener</option>
              <option value="artist">Artist</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
