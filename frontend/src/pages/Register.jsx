import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful 🎉 Please login.");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
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
          Create your account
        </p>

        {/* Name */}
        <input
          className="w-full bg-white/10 border border-white/10 p-3 rounded-lg mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 hover:scale-105 shadow-lg"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
