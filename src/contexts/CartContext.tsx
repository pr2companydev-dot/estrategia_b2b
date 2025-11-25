import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Workflow {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  price: number;
  downloadUrl: string;
}

interface CartContextType {
  cart: Workflow[];
  addToCart: (workflow: Workflow) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Workflow[]>([]);

  const addToCart = (workflow: Workflow) => {
    setCart(prev => {
      if (prev.find(item => item.id === workflow.id)) {
        return prev;
      }
      return [...prev, workflow];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
