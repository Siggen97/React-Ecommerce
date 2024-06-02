import React, { useContext, createContext, useState } from "react";

const ShoppingCartContext = createContext();

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const cartTotal = cartItems.reduce((total, item) => total + (item.price ? item.price * item.quantity : 0), 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const toggleCart = () => setIsOpen(prev => !prev);

    function getItemQuantity(id) {
        const item = cartItems.find(item => item.id === id);
        return item ? item.quantity : 0;
    }

    function increaseCartQuantity(product) {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    }

    function decreaseCartQuantity(id) {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return prevItems.filter(item => item.id !== id);
            }
        });
    }

    function removeItemFromCart(id) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }

    const value = {
        cartItems,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeItemFromCart,
        cartTotal,
        openCart,
        closeCart,
        toggleCart,
        isOpen
    };

    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
