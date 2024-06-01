import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import { Layout } from './layout/Layout';
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout"; 
import { ShoppingCartProvider } from './context/ShoppingCartContext';



function App() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
      fetch('https://v2.api.noroff.dev/online-shop')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch');
              }
              return response.json();
          })
          .then(data => {
              const products = data.data;
              setProducts(products);
              const featured = products.filter(product => product.discountedPrice < product.price);
              setFeaturedProducts(featured);
          })
          .catch(error => console.error('Fetching error:', error));
  }, []);

  if (!products) {
      return <div>Loading...</div>;
  }

  return (
      <>
      <ShoppingCartProvider>
         <Layout>
          <div className='container'>
              <Routes>
                  <Route path="/" element={<Home products={featuredProducts} />} />
                  <Route path="/products" element={<Products products={products} />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/checkout" element={<Checkout />} />
              </Routes>
          </div>
          </Layout>
      </ShoppingCartProvider>
      </>
  );
}

export default App;
