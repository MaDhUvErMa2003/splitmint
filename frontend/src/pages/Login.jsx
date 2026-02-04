import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-fadeIn">
      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl w-96 p-8">

        {/* Brand */}
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-2">
          SplitMint
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Split expenses. Stay sorted.
        </p>

        {/* Email */}
        <input
          className="w-full bg-white/10 border border-white/10 p-3 rounded-lg mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="w-full bg-white/10 border border-white/10 p-3 rounded-lg mb-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 hover:scale-105 shadow-lg"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400 mt-5">
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
