import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const tambahKeranjang = (produk) => {
    setCart((sebelumnya) => {
      const ditemukan = sebelumnya.find(
        (item) => item.id === produk.id
      );

      if (ditemukan) {
        return sebelumnya.map((item) =>
          item.id === produk.id
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
        );
      }

      return [...sebelumnya, { ...produk, jumlah: 1 }];
    });
  };

  const hapusKeranjang = (id) => {
    setCart((sebelumnya) =>
      sebelumnya.filter((item) => item.id !== id)
    );
  };

  const ubahJumlah = (id, jumlah) => {
    if (jumlah < 1) return;

    setCart((sebelumnya) =>
      sebelumnya.map((item) =>
        item.id === id ? { ...item, jumlah } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, tambahKeranjang, hapusKeranjang, ubahJumlah }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
