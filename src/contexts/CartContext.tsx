import { createContext, useContext, useState, ReactNode } from "react";

export interface Workflow {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  longDescription: string;
  filename: string;
}

interface CartContextType {
  cart: Workflow[];
  addToCart: (workflow: Workflow) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Workflow[]>([]);

  const addToCart = (workflow: Workflow) => {
    setCart((prev) => {
      if (prev.find((item) => item.id === workflow.id)) {
        return prev;
      }
      return [...prev, workflow];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: number) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
