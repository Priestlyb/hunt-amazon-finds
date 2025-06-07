// Products.js
import React, { useState, useEffect } from 'react';
import './products.css';
import Product from './product';
import { AxiosInstance } from '../../config';

const URL = "/products";

const fetchHandler = async () => {
  return await AxiosInstance.get(URL).then((res) => res.data);
};

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchHandler().then((data) => {
      setProducts(data.products || []);
    });
  }, []);

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id='products'>
      <div className="input-container">
        <input
          placeholder="Hunt Product..."
          className="search_input"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Search icon can remain unchanged */}
      </div>

      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div id='products_item'>
        <div className='products'>
          {(filteredProducts.length > 0 ? filteredProducts : Array(8).fill(null)).map((product, idx) => (
            <div key={idx}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
