import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="w-full bg-black shadow-md">
      <div className="flex justify-between items-center px-6 py-4 text-white font-bold italic">
        <h1
          className="text-lg cursor-pointer hover:text-amber-300 transition"
          onClick={() => navigate("/home")}
        >
          Pragnakalp
        </h1>

        <div className="flex items-center gap-8">
          <ul className="flex gap-6">
            <li
              className="hover:text-amber-300 transition cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Home
            </li>
            <li
              className="hover:text-amber-300 transition cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Product
            </li>
          </ul>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
