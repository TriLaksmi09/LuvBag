
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

export default function Cart() {
  const { cart, hapusKeranjang, ubahJumlah } = useCart();

  const totalHarga = cart.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">
        Keranjang Belanja
      </h1>

      {cart.length === 0 ? (
        <div className="border rounded-xl p-8 text-center shadow-sm">
          <p className="text-gray-600 mb-4">
            Belum ada produk di keranjang.
          </p>

          <Link
            to="/"
            className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center gap-5"
            >
              <div className="bg-pink-50 rounded-xl w-32 h-32 flex items-center justify-center overflow-hidden p-2">
  <img
    src={item.gambar}
    alt={item.nama}
    className="w-full h-full object-contain rounded-lg"
  />
</div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-bold text-lg">
                  {item.nama}
                </h2>

                <p className="text-pink-600 font-semibold mt-2">
                  Rp {item.harga.toLocaleString("id-ID")}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                  <button
                    onClick={() =>
                      ubahJumlah(item.id, item.jumlah - 1)
                    }
                    disabled={item.jumlah <= 1}
                    className="border rounded px-3 py-1 disabled:opacity-40"
                  >
                    -
                  </button>

                  <span>{item.jumlah}</span>

                  <button
                    onClick={() =>
                      ubahJumlah(item.id, item.jumlah + 1)
                    }
                    className="border rounded px-3 py-1"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => hapusKeranjang(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Hapus
              </button>
            </div>
          ))}

          <div className="border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Belanja</span>
              <span className="text-pink-600">
                Rp {totalHarga.toLocaleString("id-ID")}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-pink-600 text-white py-3 rounded-full mt-5 hover:bg-pink-700"
            >
              Lanjut ke Checkout →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
 