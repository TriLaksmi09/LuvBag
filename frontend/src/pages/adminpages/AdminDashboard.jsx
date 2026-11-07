
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useProducts } from "../../Context/ProductContext";

export default function AdminDashboard() {
  const {
    products,
    isLoading,
    isError,
    deleteProduct,
  } = useProducts();

  // Menampilkan pesan error
  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">
        Error loading products.
      </p>
    );
  }

  // Menampilkan loading
  if (isLoading) {
    return (
      <p className="text-center py-10 text-pink-600">
        Memuat produk...
      </p>
    );
  }

  // Fungsi menghapus produk
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus produk ini?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Produk berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus produk.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-pink-600">
        Manajemen Produk
      </h1>

      {/* Tombol tambah produk */}
      <div className="mb-4">
        <Link
          to="/admin/add-product"
          className="inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 text-sm"
        >
          + Tambah Produk
        </Link>
      </div>

      {/* Tabel produk */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse border border-gray-400 text-xs">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-400 p-2 w-8">#</th>
              <th className="border border-gray-400 p-2">Image</th>
              <th className="border border-gray-400 p-2">Nama</th>
              <th className="border border-gray-400 p-2">Harga</th>
              <th className="border border-gray-400 p-2">Stok</th>
              <th className="border border-gray-400 p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {products?.length > 0 ? (
              products.map((p, index) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border border-gray-400 p-2">
                    {index + 1}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">
                        Tidak ada gambar
                      </span>
                    )}
                  </td>

                  <td className="border border-gray-400 p-2">
                    <div className="font-medium text-gray-800">
                      {p.name}
                    </div>
                    <small className="text-gray-500">
                      #{p.category}
                    </small>
                  </td>

                  <td className="border border-gray-400 p-2 whitespace-nowrap">
                    Rp. {Number(p.price).toLocaleString("id-ID")}
                  </td>

                  <td className="border border-gray-400 p-2 text-center">
                    {p.stock}
                  </td>

                  <td className="border border-gray-400 p-2 whitespace-nowrap">
                    <Link
                      to={`/admin/edit-product/${p.id}`}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="cursor-pointer text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-400 p-4 text-center text-gray-500"
                >
                  Belum ada produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
              