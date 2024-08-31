import React, { useState } from 'react';
import Products from '../components/Products';
import SearchBar from '../components/SearchBar';

function Home({ products }) {
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
            <h3>Featured Products</h3>
            <SearchBar onSearch={handleSearch} />
            <Products products={filteredProducts} />
        </div>
    );
}

export default Home;
