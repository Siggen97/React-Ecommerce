import React from 'react';
import Product from './Product'; // Ensure this path is correct

function Products({ products }) {
    if (!products) {
        return <div>Loading products...</div>;
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {products.map(product => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}

export default Products;