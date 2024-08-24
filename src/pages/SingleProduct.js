<<<<<<< Updated upstream
=======
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Card, Button, Badge, ListGroup, Spinner, Alert } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

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
        return <div className="text-center"><Spinner animation="border" variant="primary" /></div>;
    }

    if (error) {
        return <Alert variant="danger">Error: {error}</Alert>;
    }

    if (!product) {
        return <Alert variant="warning">No product found</Alert>;
    }

    const { title, description, price, discountedPrice, image, rating, tags, reviews } = product;
    const quantity = getItemQuantity(product.id);

    return (
        <div className="single-product-page container mt-4">
            <Card className="product-card mx-auto" style={{ maxWidth: '540px', border: 'none' }}>
                {image && (
                    <Card.Img variant="top" src={image.url} alt={image.alt || title} style={{ borderRadius: '10px' }} />
                )}
                <Card.Body>
                    <Card.Title className="text-center mb-3" style={{ fontSize: '1.75rem' }}>{title}</Card.Title>
                    
                    <div className="text-center mb-4">
                        <StarRatings
                            rating={rating}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name='rating'
                            starDimension="24px"
                            starSpacing="2px"
                        />
                        <span className="ml-2">({rating}/5)</span>
                    </div>

                    <Card.Text className="mb-4" style={{ fontSize: '1rem' }}>{description}</Card.Text>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        {discountedPrice < price ? (
                            <Card.Text className='discount'>
                                <span className='original-price text-muted' style={{ textDecoration: 'line-through' }}>Regular Price: ${price.toFixed(2)}</span>
                                <br />
                                <span className='discount-price'>Discounted Price: ${discountedPrice.toFixed(2)}</span>
                            </Card.Text>
                        ) : (
                            <Card.Text className='price'>Price: ${price.toFixed(2)}</Card.Text>
                        )}
                        <div>
                            {tags.map(tag => (
                                <Badge key={tag} pill variant="secondary" className="ml-1">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className='mt-auto'>
                        {quantity === 0 ? (
                            <Button variant="primary" className="w-100 mb-3" onClick={() => increaseCartQuantity(product)}>+ Add To Cart</Button>
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

                    {reviews && reviews.length > 0 && (
                        <div className="mt-4">
                            <h5>Customer Reviews</h5>
                            <ListGroup variant="flush">
                                {reviews.map(review => (
                                    <ListGroup.Item key={review.id}>
                                        <strong>{review.username}</strong>: {review.description}
                                        <StarRatings
                                            rating={review.rating}
                                            starRatedColor="gold"
                                            numberOfStars={5}
                                            name='review-rating'
                                            starDimension="16px"
                                            starSpacing="1px"
                                            className="ml-2"
                                        />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default SingleProduct;
>>>>>>> Stashed changes
