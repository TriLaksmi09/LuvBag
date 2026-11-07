
import { Link } from "react-router-dom";

// Sidebar menerima props dari AdminLayout
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white shadow-md`}
    >
      {/* Logo Admin */}
      <div className="p-4 font-bold text-xl text-pink-600">
        LuvBag Admin
      </div>

      {/* Navigasi Sidebar */}
      <nav className="flex flex-col p-4 space-y-2">

        {/* Navigasi Dashboard */}
        <Link
          to="/admin/dashboard"
          onClick={() => setSidebarOpen(false)}
          className="hover:bg-pink-100 p-2 rounded"
        >
          Dashboard
        </Link>

        {/* Navigasi About */}
        <Link
          to="/admin/about"
          onClick={() => setSidebarOpen(false)}
          className="hover:bg-pink-100 p-2 rounded"
        >
          About
        </Link>

      </nav>
    </div>
  );
}
