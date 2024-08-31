// src/pages/ProductsPage.js
import React, { useState } from 'react';
import Products from '../components/Products';
import SearchBar from '../components/SearchBar';

function ProductsPage({ products }) {
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(lowercasedQuery) ||
            product.description.toLowerCase().includes(lowercasedQuery) ||
            product.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
        );
        setFilteredProducts(filtered);
    };

    return (
        <div>
            <h3>All Products</h3>
            <SearchBar onSearch={handleSearch} />
            <Products products={filteredProducts} />
            <Products products={products} />
        </div>
    );
}

export default ProductsPage;
