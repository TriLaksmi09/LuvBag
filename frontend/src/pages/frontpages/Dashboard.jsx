
import { Link } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../../Context/ProductContext";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mengambil produk dari API melalui ProductContext
  const { products, isLoading, error } = useProducts();

  // Mengubah format data API menjadi URL gambar
  
const getImageUrl = (image) => {
  if (!image) return "/assets/ToteBag.jpeg";

  // Gambar dari folder public/assets React
  if (image.startsWith("/assets/")) {
    return image;
  }

  // Gambar dengan alamat URL lengkap
  if (image.startsWith("http")) {
    return image;
  }

  // Gambar hasil upload melalui Laravel
  return `http://127.0.0.1:8000/storage/${image.replace(/^\/+/, "")}`;
};


  // Pencarian produk
  const kataKunci = searchTerm.trim().toLowerCase();

  const produkDitampilkan = products.filter((product) =>
    (product.name || "").toLowerCase().includes(kataKunci) ||
    (product.category || "").toLowerCase().includes(kataKunci) ||
    (product.description || "").toLowerCase().includes(kataKunci) ||
    (product.label || "").toLowerCase().includes(kataKunci)
  );

  const jumlahKategori = new Set(
    products.map((product) => product.category)
  ).size;

  return (
    <div className="bg-white">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-pink-100 via-pink-50 to-rose-100 rounded-3xl p-8 md:p-14 mb-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          <div>
            <span className="inline-block bg-white text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              Welcome to LuvBag
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Temukan Tas Favoritmu,
              <span className="text-pink-600">
                {" "}Tampil Lebih Percaya Diri!
              </span>
            </h1>

            <p className="text-gray-600 mt-5 leading-relaxed">
              Lengkapi setiap aktivitasmu dengan koleksi tas
              pilihan dari LuvBag. Desain menarik untuk menemani
              berbagai momen spesialmu.
            </p>

            <a
              href="#produk"
              className="inline-block mt-7 bg-pink-600 hover:bg-pink-700 text-white px-7 py-3 rounded-full font-semibold transition"
            >
              Belanja Sekarang →
            </a>

            <div className="flex gap-8 mt-9">
              <div>
                <h3 className="text-2xl font-bold text-pink-600">
                  {products.length}+
                </h3>
                <p className="text-sm text-gray-500">
                  Pilihan Produk
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-pink-600">
                  {jumlahKategori}
                </h3>
                <p className="text-sm text-gray-500">
                  Kategori Tas
                </p>
              </div>
            </div>
          </div>

          {/* GAMBAR HERO */}
          <div className="relative bg-white/70 rounded-3xl min-h-64 md:min-h-80 flex items-center justify-center overflow-hidden p-5">
            <img
              src="/assets/TasWanita.jpeg"
              alt="Koleksi Tas LuvBag"
              className="w-full h-64 md:h-80 object-contain rounded-2xl"
            />
          </div>

        </div>
      </section>

      {/* PRODUK */}
      <section id="produk" className="mb-14 scroll-mt-8">

        {/* JUDUL DAN SEARCH */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-7">

          <div>
            <p className="text-pink-600 font-semibold">
              OUR PRODUCTS
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Koleksi Tas LuvBag
            </h2>

            <p className="text-gray-500 mt-2">
              Pilihan tas untuk menemani setiap aktivitasmu.
            </p>
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Cari nama tas, kategori, atau produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 border border-pink-200 rounded-full outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
            />
          </div>

        </div>

        {/* KONDISI DATA */}
        {isLoading && (
          <p className="text-center py-10 text-gray-500">
            Memuat produk...
          </p>
        )}

        {error && (
          <p className="text-center py-10 text-red-500">
            Gagal mengambil data produk dari server.
          </p>
        )}

        {/* GRID PRODUK */}
        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {produkDitampilkan.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-pink-100 rounded-2xl overflow-hidden hover:shadow-xl transition group"
                >

                  {/* GAMBAR PRODUK */}
                  <div className="bg-pink-50 h-56 flex items-center justify-center relative overflow-hidden">

                    <span className="absolute top-4 left-4 z-10 bg-white text-pink-600 text-xs font-semibold px-3 py-2 rounded-full">
                      {product.label || "LuvBag"}
                    </span>

                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />

                  </div>

                  {/* INFORMASI PRODUK */}
                  <div className="p-5">

                    <p className="text-xs text-pink-500 font-semibold">
                      {product.category}
                    </p>

                    <h3 className="font-bold text-lg text-gray-800 mt-2">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2 min-h-10">
                      {product.description}
                    </p>

                    {/* HARGA DAN DETAIL */}
                    <div className="flex justify-between items-center mt-5">

                      <p className="text-pink-600 font-bold text-lg">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </p>

                      <Link
                        to={`/product/${product.id}`}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                      >
                        Lihat Detail
                      </Link>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* JIKA PRODUK TIDAK DITEMUKAN */}
            {produkDitampilkan.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                Produk tidak ditemukan.
              </p>
            )}
          </>
        )}

      </section>

      {/* KEUNGGULAN */}
      <section className="bg-pink-50 rounded-3xl p-8 md:p-10 mb-14">

        <div className="text-center mb-8">
          <p className="text-pink-600 font-semibold">
            WHY LUVBAG?
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Mengapa Memilih LuvBag?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7 text-center">

          <div>
            <span className="text-4xl">♡</span>

            <h3 className="font-bold text-gray-800 mt-3">
              Desain Menarik
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Pilihan desain tas yang menarik untuk berbagai aktivitas.
            </p>
          </div>

          <div>
            <span className="text-4xl">✦</span>

            <h3 className="font-bold text-gray-800 mt-3">
              Pilihan Beragam
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Berbagai kategori tas yang bisa disesuaikan dengan kebutuhan.
            </p>
          </div>

          <div>
            <span className="text-4xl">🛍</span>

            <h3 className="font-bold text-gray-800 mt-3">
              Mudah Berbelanja
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Temukan produk dan lihat detailnya dengan mudah.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-pink-600 text-white rounded-3xl p-8 md:p-12 text-center mb-8">

        <h2 className="text-3xl font-bold">
          Sudah Menemukan Tas Favoritmu?
        </h2>

        <p className="mt-3 text-pink-100">
          Jelajahi koleksi LuvBag dan temukan tas yang cocok untukmu.
        </p>

        <a
          href="#produk"
          className="inline-block mt-6 bg-white text-pink-600 px-7 py-3 rounded-full font-bold hover:bg-pink-100 transition"
        >
          Mulai Belanja
        </a>

      </section>

    </div>
  );
}
