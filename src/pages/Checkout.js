
import React, { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { cartItems, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart, clearCart } = useShoppingCart();

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setLoading(true);

        
        setTimeout(() => {
            
            clearCart();
            
            navigate('/checkoutsuccess');
        }, 2000); 
    };

    return (
        <div className="checkout">
        <div className='personal-info'>
            <h1>Checkout</h1>
            <h3> Personal Information </h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={form.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
        </div>
            <div className='checkout-cart-purchase'>
                {cartItems.map(item => (
                    <div key={item.id} className="checkout-item">
                        <img src={item.image.url} alt={item.image.alt} style={{ width: '100px', height: '100px' }} />
                        <div>
                            <h2>{item.title}</h2>
                            <p>{item.quantity} x ${item.price.toFixed(2)}</p>
                            <div>
                                <button className='btn btn-primary m-1' onClick={() => decreaseCartQuantity(item.id)}>-</button>
                                <button className='btn btn-primary m-1' onClick={() => increaseCartQuantity(item.id)}>+</button>
                                <button className='btn btn-danger m-1' onClick={() => removeItemFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <Link to="/checkoutsuccess" className="site-name"><button as={Link} to="/checkoutsuccess" className='btn btn-success' disabled={loading}>{loading ? 'Processing...' : 'Purchase'}</button></Link>
            </div>
        </div>
    );
}

export default Checkout;
