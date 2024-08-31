import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Dropdown, Badge, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function ShoppingCart() {
    const { cartItems, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart, cartTotal, isOpen, openCart, closeCart } = useShoppingCart();
    const [searchQuery, setSearchQuery] = useState('');

    // Filtered cart items based on search query
    const filteredItems = cartItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="shopping-cart btn btn-primary position-relative" onMouseEnter={openCart} onMouseLeave={closeCart}>
            <Dropdown show={isOpen}>
                <Dropdown.Toggle as="div" id="dropdown-basic-button" className="position-relative">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {cartItems.length > 0 && (
                        <Badge pill variant="danger" className="cart-badge position-absolute top-0 start-100 translate-middle">
                            {cartItems.reduce((total, item) => total + item.quantity, 0)}
                        </Badge>
                    )}
                </Dropdown.Toggle>

                <Dropdown.Menu align="right">
                    <div className="p-2">
                        <FormControl
                            type="text"
                            placeholder="Search cart..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                            <Dropdown.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <div className="cart-item d-flex align-items-center">
                                    {item.image && (
                                        <img src={item.image.url} alt={item.image.alt || 'Product Image'} style={{ width: '50px', height: '50px' }} />
                                    )}
                                    <div className="ml-3">
                                        <p>{item.title}</p>
                                        <p>{item.quantity} x ${item.discountedPrice ? item.discountedPrice.toFixed(2) : item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="ml-auto cart-quantity">
                                    <button className="btn btn-sm btn-primary m-1" onClick={() => decreaseCartQuantity(item.id)}>-</button>
                                    <button className="btn btn-sm btn-primary m-1" onClick={() => increaseCartQuantity(item)}>+</button>
                                    <button className="btn btn-sm btn-danger m-1" onClick={() => removeItemFromCart(item.id)}>Remove</button>
                                </div>
                            </Dropdown.Item>
                        ))
                    ) : (
                        <Dropdown.Item className="text-center">
                            <em>No items found</em>
                        </Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-center">
                        <div>Total: ${cartTotal.toFixed(2)}</div>
                    </Dropdown.Item>
                    <Dropdown.Item className="text-center">
                        <Link to="/checkout" className="btn btn-dark" id='btnCheckout' disabled={cartItems.length === 0}>
                            {cartItems.length === 0 ? 'Cart is empty' : 'Go to Checkout'}
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default ShoppingCart;
