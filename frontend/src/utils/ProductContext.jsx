import React, { createContext, useContext } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../utils/apiClient";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Mengambil semua produk
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await apiClient.get("/products");
      return response.data.data;
    },
  });

  // Menambahkan produk
  const addProduct = useMutation({
    mutationFn: async (productData) => {
      return await apiClient.post("/products", productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produk berhasil ditambahkan!");
    },
    onError: () => {
      toast.error("Gagal menambahkan produk!");
    },
  });

  // Mengubah produk
  const updateProduct = useMutation({
    mutationFn: async ({ id, productData }) => {
      return await apiClient.put(`/products/${id}`, productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produk berhasil diperbarui!");
    },
    onError: () => {
      toast.error("Gagal memperbarui produk!");
    },
  });

  // Menghapus produk
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      return await apiClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produk berhasil dihapus!");
    },
    onError: () => {
      toast.error("Gagal menghapus produk!");
    },
  });

  // Mengambil data kategori
  const getCategories = async () => {
    const res = await apiClient.get("/categories");
    return res.data;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        isError,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};