import React from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function ShoppingCart() {
    const { cartItems, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart, cartTotal, isOpen, openCart, closeCart } = useShoppingCart();

    return (
        <div className="shopping-cart btn btn-primary" onMouseEnter={openCart} onMouseLeave={closeCart}>
            <Dropdown show={isOpen}>
                <Dropdown.Toggle as={FontAwesomeIcon} icon={faShoppingCart} id="dropdown-basic-button" />

                <Dropdown.Menu align="right">
                    {cartItems.map(item => (
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
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-center">
                        <div>Total: ${cartTotal.toFixed(2)}</div>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/checkout" className="text-center">
                        <button className='btn btn-dark'>Go to Checkout</button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default ShoppingCart;
