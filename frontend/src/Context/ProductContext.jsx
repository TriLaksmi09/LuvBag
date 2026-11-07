
import React, {
  createContext,
  useContext,
  useCallback,
} from "react";

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
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await apiClient.get("/products");
      return response.data.data;
    },
  });

  // Mengambil satu produk berdasarkan ID
  const getProductById = useCallback(async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data.data;
  }, []);

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
      productData.append("_method", "PUT");

      return await apiClient.post(
        `/products/${id}`,
        productData
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      queryClient.invalidateQueries({
        queryKey: ["product", variables.id],
      });
    },
    onError: () => {
      toast.error("Gagal memperbarui produk!");
    },
  });

  // Mengambil kategori
  const getCategories = async () => {
    const res = await apiClient.get("/categories");
    return res.data.data;
  };

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

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getCategories,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
