import axios from 'axios'

export const api = axios.create({
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

export const post = async (endpoint, data, token) => {

    try {
        const response = await api.post(endpoint, data,
            {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg5Y2UzNTk4YzQ3M2FmMWJkYTRiZmY5NWU2Yzg3MzY0NTAyMDZmYmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxOTI0MDY1Nzc3MTgta2NobGkwc21qbmM4cGZlbzF2OGM0bWNhcDdsNzNzN3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxOTI0MDY1Nzc3MTgta2NobGkwc21qbmM4cGZlbzF2OGM0bWNhcDdsNzNzN3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYyMDkxNDgwNDc5MDUwNjk4MDciLCJlbWFpbCI6Iml2YXNoMTIyOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlNCZmgtYW5va2t0TkIwa2RDN1lQbnciLCJuYW1lIjoiS3Jpc3RpbmEgR2x1c2hrb3ZhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0x4OGpKMUtKZk9GR0tOWXJjR2lKTDdSLXlMN3cxSDAtNnlIaGJWcDNWMlplMnBqVjJJY0E9czk2LWMiLCJnaXZlbl9uYW1lIjoiS3Jpc3RpbmEiLCJmYW1pbHlfbmFtZSI6IkdsdXNoa292YSIsImlhdCI6MTczNjUzNTk0OCwiZXhwIjoxNzM2NTM5NTQ4fQ.fTU8N4z2KoVtRMnaD333qCUL9Z2-pq26en4l_czXeNI6u85HCPNBD_9AKa1kHT0FmagpxSSzXwBSzGaO4y-9-gnst_As8tQaLChvfMcDq4pt3aKuuCayYB0d9QXpjRM8B7hV_vKVX27P4TPMiYVQSu2fWEDNKNOLwleT7n8nfENOoVMlcED8sN-7izYbnCTJe5Ge3zHNrdo6j2bUMsCfjEIyGsTIFjgysyor_jgUrFURIluALY5amfSO0m9wUZgOsyp9qHwPr81ugs8uzynJ3qfKhqsiZGPQqk0tYYxdQvyacoxQFXop1JABlGPX4nZdFvYzhpP0vkAD0I0A_AeaQg`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const get = async (endpoint, token) => {
    try {
        const response = await api.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default api;