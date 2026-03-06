import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Music, Mail, Lock } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // clear previous errors
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        Email: email,    // match backend key exactly
        Password: password,
        withCredentials: true, // important for cookies if backend uses them
      });
      console.log("Login successful", res.data);
      console.log("Login successful", res.data.users.role);

      // Save JWT in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.users.role);

      // Save user info in state
      setUser(res.data.user);
      navigate("/Browse"); 

    } catch (err) {
      // Display proper error message under the form
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Network error, try again");
      }
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
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue listening
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
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
              required
            />
          </div>

          {/* Display error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        
        </p>
      </motion.div>
    </div>
  );
};

export default Login;