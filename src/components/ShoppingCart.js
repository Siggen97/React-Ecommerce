import React from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function ShoppingCart() {
    const { cartItems, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart, cartTotal, toggleCart, isOpen } = useShoppingCart();

    return (
        <div className="shopping-cart" onMouseEnter={toggleCart} onMouseLeave={toggleCart}>
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
                                <div>
                                    <button onClick={() => increaseCartQuantity(item.id)}>+</button>
                                    <button onClick={() => decreaseCartQuantity(item.id)}>-</button>
                                    <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <div>Total: ${cartTotal.toFixed(2)}</div>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/checkout">Go to Checkout</Dropdown.Item>
                </Dropdown.Menu>
            </DropdownButton>
        </div>
    );
}

export default ShoppingCart;
