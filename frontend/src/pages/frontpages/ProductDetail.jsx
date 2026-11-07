import { Link, useParams } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { tambahKeranjang } = useCart();

  const products = [
    {
      id: 1,
      nama: "Casual Tote Bag",
      kategori: "Tote Bag",
      deskripsi: "Tas simpel dan praktis untuk kuliah dan aktivitas sehari-hari.",
      harga: 75000,
      gambar: "/assets/ToteBag.jpeg",
    },
    {
      id: 2,
      nama: "Korean Shoulder Bag",
      kategori: "Shoulder Bag",
      deskripsi: "Tas wanita dengan desain modern dan elegan.",
      harga: 120000,
      gambar: "/assets/ShoulderBag.jpeg",
    },
    {
      id: 3,
      nama: "Mini Sling Bag",
      kategori: "Sling Bag",
      deskripsi: "Tas kecil yang praktis untuk bepergian.",
      harga: 95000,
      gambar: "/assets/SlingBag.jpeg",
    },
    {
      id: 4,
      nama: "Korean School Bag",
      kategori: "School Bag",
      deskripsi: "Tas sekolah dengan desain lucu dan kapasitas luas.",
      harga: 145000,
      gambar: "/assets/SchoolBag.jpeg",
    },
    {
      id: 5,
      nama: "Daily Backpack",
      kategori: "Backpack",
      deskripsi: "Tas ransel nyaman untuk sekolah dan kegiatan harian.",
      harga: 175000,
      gambar: "/assets/Backpack.jpeg",
    },
  ];

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold">Produk tidak ditemukan</h1>
        <Link to="/" className="text-pink-600 underline mt-4 inline-block">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* TOMBOL KEMBALI */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-800 mb-8"
      >
        ← Kembali ke Beranda
      </Link>

      {/* DETAIL PRODUK */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div className="bg-pink-50 rounded-3xl h-[420px] flex items-center justify-center overflow-hidden p-5">
          <img
          src={product.gambar}
          alt={product.nama}
          className="w-full h-full object-contain rounded-2xl"
          />
        </div>

        <div>
          <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm">
            {product.kategori}
          </span>

          <h1 className="text-3xl font-bold text-gray-800 mt-5">
            {product.nama}
          </h1>

          <p className="text-gray-600 leading-relaxed mt-4">
            {product.deskripsi}
          </p>

          <p className="text-3xl font-bold text-pink-600 mt-6">
            Rp {product.harga.toLocaleString("id-ID")}
          </p>

         <div className="flex flex-col sm:flex-row gap-3 mt-8">
  <button
    onClick={() => {
      tambahKeranjang(product);
      alert("Produk berhasil ditambahkan ke keranjang!");
    }}
    className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
  >
    + Tambah ke Keranjang
  </button>

  <Link
    to="/checkout"
    className="border border-pink-600 text-pink-600 px-6 py-3 rounded-full text-center hover:bg-pink-50 transition"
  >
    Checkout →
  </Link>
</div>

          <div className="border-t mt-8 pt-5 text-sm text-gray-500">
            <p>♡ Koleksi pilihan LuvBag</p>
            <p className="mt-2">✦ Temukan tas sesuai aktivitasmu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
