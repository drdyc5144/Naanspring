import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Error loading cart:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Update totals whenever items change
  useEffect(() => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    setTotalPrice(total);
    setTotalItems(count);

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if product already exists
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      // Add new product
      return [...prevItems, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("cart");
  }, []);

  const getItemCount = useCallback(
    (productId) => {
      const item = items.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
    [items],
  );

  const getTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const applyCoupon = useCallback(
    async (code) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock coupon validation
        if (code === "NAAN10") {
          const discount = totalPrice * 0.1;
          return { success: true, discount, message: "10% discount applied!" };
        }

        return { success: false, error: "Invalid coupon code" };
      } catch (error) {
        return { success: false, error: "Failed to apply coupon" };
      } finally {
        setIsLoading(false);
      }
    },
    [totalPrice],
  );

  const value = {
    items,
    totalItems,
    totalPrice,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotal,
    applyCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
