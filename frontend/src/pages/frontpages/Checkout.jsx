
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../Context/CartContext";

export default function Checkout() {
  // Mengambil data keranjang
  const { cart } = useCart();

  // State informasi pelanggan
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pembayaran, setPembayaran] = useState("Transfer Bank");

  // Menghitung subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  // Ongkos kirim
  const ongkosKirim = cart.length > 0 ? 10000 : 0;

  // Total pembayaran
  const totalHarga = subtotal + ongkosKirim;

  // Format rupiah
  const formatRupiah = (angka) =>
    angka.toLocaleString("id-ID");

  // Proses pemesanan
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    alert(
      "Terima kasih " +
      nama +
      "! Pesanan kamu berhasil dibuat.\n\n" +
      "Total pembayaran: Rp " +
      formatRupiah(totalHarga)
    );
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <Link
          to="/cart"
          className="text-pink-600 font-semibold hover:text-pink-800"
        >
          ← Kembali ke Keranjang
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mt-5">
          Checkout
        </h1>

        <p className="text-gray-500 mt-2">
          Lengkapi informasi berikut untuk melanjutkan pesananmu.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM PELANGGAN */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                1. Informasi Pelanggan
              </h2>

              <div className="space-y-4">

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contoh@email.com"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    required
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    placeholder="Masukkan nomor telepon"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Alamat Pengiriman
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    placeholder="Masukkan alamat lengkap"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 outline-none"
                  />
                </div>

              </div>
            </div>

            {/* METODE PEMBAYARAN */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                2. Metode Pembayaran
              </h2>

              <div className="space-y-3">
                {[
                  "Transfer Bank",
                  "E-Wallet",
                  "COD (Bayar di Tempat)"
                ].map((metode) => (
                  <label
                    key={metode}
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer ${
                      pembayaran === metode
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pembayaran"
                      value={metode}
                      checked={pembayaran === metode}
                      onChange={(e) =>
                        setPembayaran(e.target.value)
                      }
                      className="accent-pink-600"
                    />

                    <span className="font-medium text-gray-700">
                      {metode}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* RINGKASAN PESANAN */}
          <div>
            <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-6">

              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Ringkasan Pesanan
              </h2>

              {cart.length === 0 ? (
                <div className="bg-pink-50 rounded-xl p-5 text-center">
                  <span className="text-4xl">🛍️</span>

                  <p className="font-semibold text-gray-700 mt-3">
                    Belum ada produk
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Produk yang dipilih akan ditampilkan di sini.
                  </p>

                  <Link
                    to="/"
                    className="inline-block mt-4 text-pink-600 font-semibold hover:underline"
                  >
                    Pilih Produk →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b pb-4"
                    >
                      <img
                        src={item.gambar}
                        alt={item.nama}
                        className="w-20 h-20 object-cover rounded-xl bg-pink-50"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800">
                          {item.nama}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Jumlah: {item.jumlah}
                        </p>

                        <p className="text-pink-600 font-semibold mt-2">
                          Rp {formatRupiah(item.harga * item.jumlah)}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              )}

              {/* TOTAL PEMBAYARAN */}
              <div className="border-t mt-6 pt-4 space-y-3">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp {formatRupiah(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span>Rp {formatRupiah(ongkosKirim)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-pink-600">
                    Rp {formatRupiah(totalHarga)}
                  </span>
                </div>

              </div>

              {/* TOMBOL BUAT PESANAN */}
              <button
                type="submit"
                disabled={cart.length === 0}
                className={`w-full mt-6 py-3 rounded-full font-semibold transition ${
                  cart.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-pink-600 text-white hover:bg-pink-700"
                }`}
              >
                Buat Pesanan
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                {cart.length === 0
                  ? "Tambahkan produk ke keranjang untuk melanjutkan pesanan."
                  : "Pastikan informasi pesanan kamu sudah benar."}
              </p>

            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
