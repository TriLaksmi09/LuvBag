
import { useState, useEffect } from "react";
import { useProducts } from "../../Context/ProductContext";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductEdit() {
  const { id } = useParams();
  const { updateProduct, getProductById } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Mengambil data produk berdasarkan ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);

        const product = res?.data?.data ?? res?.data ?? res;

        setFormData({
          name: product.name || "",
          category: product.category || "",
          price: product.price || "",
          stock: product.stock || "",
          description: product.description || "",
          image: product.image || null,
        });
      } catch (error) {
        toast.error("Gagal memuat data produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, getProductById]);

  // Menangani perubahan input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Menyimpan perubahan produk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("description", formData.description);

    // Kirim gambar hanya jika memilih gambar baru
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      await updateProduct.mutateAsync({
        id,
        productData: data,
      });

      toast.success("Produk berhasil diperbarui!");
      navigate("/admin/dashboard");

    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal memperbarui produk.");
      }
    }
  };

  if (loading) {
    return <p className="p-4">Memuat data produk...</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-pink-600 mb-6 border-b pb-3">
        Edit Produk
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Nama Produk */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nama Produk
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama Produk"
            className="border rounded-md p-2 w-full"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name[0]}</p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Kategori
          </label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Contoh: Tote Bag"
            className="border rounded-md p-2 w-full"
            required
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category[0]}</p>
          )}
        </div>

        {/* Harga */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Harga
          </label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Harga Produk"
            className="border rounded-md p-2 w-full"
            required
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price[0]}</p>
          )}
        </div>

        {/* Stok */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Stok
          </label>
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Jumlah Stok"
            className="border rounded-md p-2 w-full"
            required
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock[0]}</p>
          )}
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tuliskan deskripsi produk"
            rows="3"
            className="border rounded-md p-2 w-full resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description[0]}
            </p>
          )}
        </div>

        {/* Gambar lama */}
        {typeof formData.image === "string" && formData.image && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Gambar Saat Ini
            </label>
            <img
              src={
                formData.image.startsWith("http")
                  ? formData.image
                  : `http://127.0.0.1:8000/storage/${formData.image}`
              }
              alt="Gambar produk"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Gambar baru */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Ganti Gambar Produk
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={updateProduct.isPending}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {updateProduct.isPending
            ? "Menyimpan..."
            : "Simpan Perubahan"}
        </button>

      </form>
    </div>
  );
}
