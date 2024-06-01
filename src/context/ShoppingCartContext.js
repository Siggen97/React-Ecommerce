import React, { useContext, createContext, useState } from "react";

const ShoppingCartContext = createContext();

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function getItemQuantity(id) {
        const item = cartItems.find(item => item.id === id);
        return item ? item.quantity : 0;
    }

    function increaseCartQuantity(id) {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { id, quantity: 1 }];
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
        removeItemFromCart
    };

    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
