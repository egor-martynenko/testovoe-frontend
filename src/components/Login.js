import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { X, CircleUserRound } from 'lucide-react';

import apiService from '../services/apiService';

export const Login = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const handleOpenModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.userLogin(username, password);
      Cookies.set('token', response.token);

      const users = await apiService.getAllUsers()
      const user = users.find(user => user.username === username);
      
      if (user && user.password === password) {
        Cookies.set('userId', user.id);
        setIsAuth(true);
      }
    } catch (error) {
      setError('Неправильное имя пользователя или пароль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative'>
      <CircleUserRound onClick={handleOpenModal} />
      {showLoginModal && (
        <div className='absolute right-0 border-2 border-black-600 bg-gray-100 mt-2'>
          {!isAuth && (
            <div className='relative p-3'>
              <h1 className='text-center'>Login</h1>
              <X className='absolute right-3 top-3' onClick={handleCloseModal} />
              <input
                type="text"
                placeholder="UserName"
                value={username}
                className='border-2 rounded border-black-600 mt-3'
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                className='border-2 rounded border-black-600 mt-1 mb-3'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                className='block border-2 border-black-600 rounded-3xl px-10 mx-auto hover:bg-slate-200' 
                onClick={handleLogin}
              >
                {loading? <>Loading...</> : <>Войти</>} 
              </button>
              
              {error && <p className='text-red-500'>{error}</p>}
            </div>
          )}
          {isAuth && (
            <p className='w-80 text-center relative'>
              <X className='absolute right-1 top-0' onClick={handleCloseModal} />
              Вы успешно вошли!
            </p>
          )}
        </div>
      )}
    </div>
  );
};
