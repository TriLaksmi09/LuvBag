
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../Context/ProductContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function ProductForm() {
  const { addProduct, getCategories } = useProducts();
  const navigate = useNavigate();

  // Fetch kategori menggunakan React Query
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  // Menangani perubahan input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Menyimpan produk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    try {
      await addProduct.mutateAsync(data);

      toast.success("Produk berhasil disimpan!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);

    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal menyimpan produk.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-pink-600 mb-6 border-b pb-3">
        Tambah Produk
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
            placeholder="Masukkan nama produk"
            className="border rounded-md p-2 w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name[0]}</p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Pilih Kategori
          </label>

          <select
            name="category"
            onChange={handleChange}
            value={formData.category}
            className="border rounded-md p-2 w-full"
          >
            <option value="">-- Pilih Kategori --</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category[0]}
            </p>
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

        {/* Gambar */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Gambar Produk
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

        {/* Tombol Simpan */}
        <button
          type="submit"
          disabled={addProduct.isPending}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {addProduct.isPending ? "Menyimpan..." : "Simpan Produk"}
        </button>

      </form>
    </div>
  );
}
