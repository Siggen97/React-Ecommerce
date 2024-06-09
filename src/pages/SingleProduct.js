import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Card, Button } from 'react-bootstrap';

const SingleProduct = () => {
    const { id } = useParams();  // Get the product ID from the URL
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart } = useShoppingCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                if (data && data.data) {
                    setProduct(data.data);
                } else {
                    throw new Error('Invalid product data');
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No product found</div>;
    }

    const { title, description, price, discountedPrice, image } = product;
    const quantity = getItemQuantity(product.id);
    

    return (
        <div className="single-product-page">
            <Card className="product-card" style={{ width: '18rem', margin: '10px' }}>
                {image && (
                    <Card.Img variant="top" src={image.url} alt={image.alt || title} />
                )}
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    {discountedPrice < price ? (
                        <Card.Text className='discount'>
                            <span className='original-price'>Regular Price: ${price ? price.toFixed(2) : 'N/A'}</span>
                            <br />
                            <span className='discount-price'>Discounted Price: ${discountedPrice ? discountedPrice.toFixed(2) : 'N/A'}</span>
                        </Card.Text>
                    ) : (
                        <Card.Text className='price'>Price: ${price ? price.toFixed(2) : 'N/A'}</Card.Text>
                    )}
                    <div className='mt-auto'>
                        {quantity === 0 ? (
                            <Button variant="primary" className="w-100" onClick={() => increaseCartQuantity(product)}>+ Add To Cart</Button>
                        ) : (
                            <div className='d-flex align-items-center flex-column' style={{ gap: '0.5rem' }}>
                                <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem' }}>
                                    <Button variant="primary" onClick={() => decreaseCartQuantity(product.id)}>-</Button>
                                    <div>
                                        <span className='fs-3'>{quantity}</span> <br />Added
                                    </div>
                                    <Button variant="primary" onClick={() => increaseCartQuantity(product)}>+</Button>
                                </div>
                                <Button variant="danger" className="w-100" onClick={() => removeItemFromCart(product.id)}>Remove</Button>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SingleProduct;
