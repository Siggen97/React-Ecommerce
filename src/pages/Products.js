// src/pages/ProductsPage.js
import React from 'react';
import Products from '../components/Products'; // Adjust the import path based on your project structure

function ProductsPage({ products }) {
    return (
        <div>
            <h3>All Products</h3>
            <Products products={products} />
        </div>
    );
}

export default ProductsPage;
