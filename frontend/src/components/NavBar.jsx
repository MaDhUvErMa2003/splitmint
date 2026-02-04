import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex justify-between items-center">
      
      {/* Brand */}
      <h1
        className="text-2xl font-bold tracking-wide text-indigo-400 cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => navigate("/dashboard")}
      >
        SplitMint
      </h1>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="text-red-400 hover:text-red-300 transition font-medium px-4 py-1 rounded-lg hover:bg-red-500/10"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
