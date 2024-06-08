import React, { useEffect } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';


function CheckoutSuccess() {
    const { clearCart } = useShoppingCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div>
            <h3>Thank You!</h3>
            <h5>Your order is on your way</h5>
        </div>
    );
};

export default CheckoutSuccess;