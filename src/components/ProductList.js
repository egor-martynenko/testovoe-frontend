import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import apiService from '../services/apiService';
import '../index.css'

export const ProductList = ({ activeCategory }) => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await apiService.getProducts();
        const filteredProducts = activeCategory === 'all' 
          ? allProducts 
          : allProducts.filter(product => product.category === activeCategory);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Ошибка при загрузке продуктов', error);
      }
    };

    fetchProducts();
  }, [activeCategory]); 

  return (
    <div>
    <h1 className='mt-20 text-3xl '>Товары</h1>

      <ul className='mt-10 grid grid-cols-4 gap-5 '>
        {products.map(product => 
        <ProductItem
          key={product.id}
          category={product.category}
          description={product.description}
          id={product.id}
          image={product.image}
          price={product.price}
          rating={product.rating}
          title={product.title}
        />
      )}
      </ul>
    
  </div>
  );
};

