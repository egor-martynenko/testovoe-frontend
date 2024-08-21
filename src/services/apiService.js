const API_URL = 'https://fakestoreapi.com';

const apiService = {

  async getProducts() {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  },

  async getCategories() {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Не удалось получить категории.');
    }
    const data = await response.json();
    return data;
  },

  async getAllUsers() {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Не удалось список пользователем.');
    }
    const data = await response.json();
    return data;
  },

  async userLogin(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Неверные учетные данные.');
    }

    const data = await response.json();
    return data;
  },

  async getUserCarts(userId) {
    const response = await fetch(`${API_URL}/carts/user/${userId}`);
    if (!response.ok) {
      throw new Error('Не удалось получить корзины.');
    }
    const data = await response.json();
    return data;
  }
 
  
};

export default apiService;