import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Music, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  // 1️⃣ State for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Listener/Artist
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 2️⃣ Backend registration handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        Username: username,
        Email: email,
        Password: password,
        Role: role,
        withCredentials: true, // important for cookies if backend uses them
      });

      // Optionally store JWT if backend returns it
      if (res.data.token) localStorage.setItem("token", res.data.token);
      console.log("Registration successful", res.data);
      setSuccess("Account created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("user");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

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

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary py-3 px-4 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="user">Listener</option>
              <option value="artist">Artist</option>
            </select>
          </div>

          {/* Show errors / success */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

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