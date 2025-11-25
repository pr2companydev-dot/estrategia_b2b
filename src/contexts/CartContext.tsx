import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

const CART_STORAGE_KEY = "estrategia-b2b-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState<Workflow[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

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
