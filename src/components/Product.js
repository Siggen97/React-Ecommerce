import React from 'react';
import { Card } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';

function Product({ product }) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart } = useShoppingCart();
    const { title, description, price, discountedPrice, image } = product;
    const quantity = getItemQuantity(product.id);

    // Calculate discount percentage if there is a discount
    const discountPercentage = price > discountedPrice ? ((price - discountedPrice) / price) * 100 : 0;

    return (
        <Card className='product-card' style={{ width: '18rem', margin: '10px' }}>
            <Card.Img id='product-img' variant="top" src={image.url} alt={image.alt || title} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                {discountPercentage > 0 && (
                    <Card.Text className='discount'>
                        <span className='original-price'>Regular Price: ${price.toFixed(2)}</span> 
                        <br/>
                        <span className='discount-percentage'>{discountPercentage.toFixed(2)}% off</span>
                        <br/>
                        <span className='discount-price'>Discounted Price: ${discountedPrice.toFixed(2)}</span>
                    </Card.Text>
                )}
                {discountPercentage === 0 && (
                    <Card.Text className='discount-price'>Price: ${discountedPrice.toFixed(2)}</Card.Text>
                )}
                <div className='mt-auto'>
                    {quantity === 0 ? (
                        <button className='btn btn-primary w-100' onClick={() => increaseCartQuantity(product)}>+ Add To Cart</button>
                    ) : (
                        <div className='d-flex align-items-center flex-column' style={{ gap: '0.5rem' }}>
                            <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem' }}>
                                <button className='btn btn-primary' onClick={() => decreaseCartQuantity(product.id)}>-</button>
                                <div>
                                    <span className='fs-3'>{quantity}</span> <br />Added
                                </div>
                                <button className='btn btn-primary' onClick={() => increaseCartQuantity(product)}>+</button>
                            </div>
                            <button className='btn btn-danger w-100' onClick={() => removeItemFromCart(product.id)}>Remove</button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default Product;
