import React from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function ShoppingCart() {
    const { cartItems, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart, cartTotal, isOpen, toggleCart, openCart, closeCart } = useShoppingCart();

    return (
        <div className="shopping-cart" onMouseEnter={openCart} onMouseLeave={closeCart}>
            <DropdownButton
                id="dropdown-basic-button"
                title={<FontAwesomeIcon icon={faShoppingCart} />}
                show={isOpen}
            >
                <Dropdown.Menu>
                    {cartItems.map(item => (
                        <Dropdown.Item key={item.id}>
                            <div className="cart-item">
                                {item.image && (
                                    <img src={item.image.url} alt={item.image.alt || 'Product Image'} style={{ width: '50px', height: '50px' }} />
                                )}
                                <div>
                                    <p>{item.title}</p>
                                    <p>{item.quantity} x ${item.price ? item.price.toFixed(2) : 'N/A'}</p>
                                </div>
                                <div className='cartBtn'>
                                    <button className='btn btn-primary' onClick={() => decreaseCartQuantity(item.id)}>-</button>
                                    <button className='btn btn-primary' onClick={() => increaseCartQuantity(item)}>+</button>
                                    <button className='btn btn-danger' onClick={() => removeItemFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <div>Total: ${cartTotal.toFixed(2)}</div>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/checkout"> <button className='btn btn-dark'>Go to Checkout</button></Dropdown.Item>
                </Dropdown.Menu>
            </DropdownButton>
        </div>
    );
}

export default ShoppingCart;
