import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Добавляем интерцептор запросов
api.interceptors.request.use(config => {
    // Получаем токен из localStorage
    const token = localStorage.getItem('idToken');
    
    if (token) {
      // Добавляем токен к каждому запросу в заголовках
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});

  api.interceptors.response.use(
    response => response,
    error => {
      // Если получаем 401, перенаправляем на логин
      if (error.response?.status === 401) {
        localStorage.removeItem('idToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
);

export default api;