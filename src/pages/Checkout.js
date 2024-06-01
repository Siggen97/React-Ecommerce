import React from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';

function Checkout() {
    const { cartItems, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart } = useShoppingCart();

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            <div>
                {cartItems.map(item => (
                    <div key={item.id} className="checkout-item">
                        <img src={item.image.url} alt={item.image.alt} style={{ width: '100px', height: '100px' }} />
                        <div>
                            <h2>{item.title}</h2>
                            <p>{item.quantity} x ${item.price.toFixed(2)}</p>
                            <div>
                                <button onClick={() => increaseCartQuantity(item.id)}>+</button>
                                <button onClick={() => decreaseCartQuantity(item.id)}>-</button>
                                <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button>Proceed to Purchase</button>
        </div>
    );
}

export default Checkout;
