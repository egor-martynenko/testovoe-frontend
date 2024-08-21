import React, { useState } from 'react';
import { Cart, Login, CategoryMenu, ProductList } from './components';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="mx-auto container">
      <header className='flex justify-between items-center'>
        <span className="text-2xl font-bold">Logo</span>
        <ul className='flex justify-between gap-8'>
          <Login />
          <Cart />
        </ul>
      </header>
      <CategoryMenu activeCategory={activeCategory}  handleSetCategory={setActiveCategory} />
      <ProductList activeCategory={activeCategory} /> 
    </div>
  );
}

export default App;