import React from 'react';
import Products from '../components/Products';

function Home({ products }) {
    return (
        <div>
            <h3>Featured Products</h3>
            <Products products={products} />
        </div>
    );
}

export default Home;
