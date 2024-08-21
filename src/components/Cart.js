import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ShoppingCart, X } from 'lucide-react';

import apiService from '../services/apiService';


export const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const userId = Cookies.get('userId');


  useEffect(() => {
    const fetchCarts = async () => {
      if (userId) {
        try {
          const data = await apiService.getUserCarts(userId);
          if (data.length > 0) {
            setCart(data[data.length - 1]);
          }
        } catch (error) {
          console.error('Ошибка при загрузке корзин:', error);
        }
      } else {
        console.error('UserID не найден в cookie.');
      }
    };

    fetchCarts();
  }, [userId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await apiService.getProducts();
        if (cart && cart.products) {
          const cartProducts = cart.products.map(item => {
            const product = allProducts.find(p => p.id === item.productId);
            return { ...product, quantity: item.quantity };
          });
          setProducts(cartProducts);
        }
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      }
    };

    fetchProducts();
  }, [cart]);

  const handleShowCart = () => {
    setShowCart(true)
  }
  const handleCloseCart = () => {
    setShowCart(false)
  }

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
  };

  return (
    <div className='relative'>
      
      <ShoppingCart onClick={handleShowCart}/>
      {showCart && (
        <div className='absolute right-0 rounded border-2 border-black-600 bg-gray-100 mt-2 w-max p-3 '>
          <div className='relative'> 
            <h1 className='text-xl font-semibold w-40'>Корзина</h1>
            <X className='absolute right-0 top-0' onClick={handleCloseCart} />
          </div>
         
          {cart ? (
            <>
            <ul className='mt-2 flex flex-col'>
              {products.length > 0 ? (
                products.map(product => (
                  <li key={product.id} className='mt-3 flex flex-wrap '>
                    <div className='w-60 leading-5'>{product.title}</div> 
                    <div className='mr-5'> x {product.quantity}</div> 
                    <span>$ {product.price * product.quantity}</span>
                  </li>
                ))
              ) : (
                <p>Корзина пуста.</p>
              )}
            </ul>
            <div className='mt-3 font-bold flex justify-between'>
              <span>Общая сумма:</span>
              <span> ${calculateTotalPrice()}</span>
            </div>
            </>
          ) : (
            <p className='mt-5'>У вас нет корзины, войдите в свой аккаунт.</p>
          )}
        </div>
      )}
    </div>
  );
};
