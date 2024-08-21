import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';


export const CategoryMenu = ({ activeCategory, handleSetCategory }) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.getCategories()
        setCategories(['all', ...data]);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-10">
      <h2 className=' text-3xl'>Категории</h2>
      <ul className='flex gap-5 mt-5'> 
        {categories.map((category, index) => (
          <li key={index} onClick={() => handleSetCategory(category)} className={`uppercase px-5 py-2 cursor-pointer rounded-full ${activeCategory === category && 'bg-slate-200'}`}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};


