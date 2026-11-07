import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-pink-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="font-bold text-2xl tracking-wide">
        LuvBag.
      </Link>

      {/* Navigasi */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="hover:text-pink-200 transition"
        >
          Beranda
        </Link>

        <Link
          to="/cart"
          className="hover:text-pink-200 transition"
        >
          Keranjang
        </Link>

        <Link
          to="/checkout"
          className="hover:text-pink-200 transition"
        >
          Checkout
        </Link>
      </div>
    </nav>
  );
}
