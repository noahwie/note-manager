import axios from 'axios';

// base URL
const API_BASE_URL = 'http://localhost:8080';

// Axios Instance mit Basis-Konfiguration
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});


// ===================================
// REQUEST INTERCEPTOR
// ===================================
// Wird AUTOMATISCH vor JEDEM Request ausgeführt
API.interceptors.request.use(
  (config) => {
    // Token aus localStorage holen
    const token = localStorage.getItem('authToken');
    
    // Wenn Token existiert, zum Authorization Header hinzufügen
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token wird mitgeschickt');
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// ===================================
// RESPONSE INTERCEPTOR
// ===================================
// Wird AUTOMATISCH nach JEDER Response ausgeführt
API.interceptors.response.use(
  (response) => {
    // Success Response - einfach durchreichen
    return response;
  },
  (error) => {
    // Error Response behandeln
    if (error.response) {
      const status = error.response.status;
      
      // 401 = Unauthorized (Token ungültig oder abgelaufen)
      if (status === 401) {
        console.log('🚪 Token ungültig - Logout erforderlich');
        
        // Token aus localStorage löschen
        localStorage.removeItem('authToken');
      }
      
      // 403 = Forbidden (keine Berechtigung)
      if (status === 403) {
        console.log('⛔ Keine Berechtigung für diese Aktion');
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;

export const getFolders = () => API.get('/folders');
export const createFolder = (data) => API.post('/folders', data);
export const deleteFolder = (id) => API.delete(`/folders/${id}`);

export const getNotesInFolder = (id) => API.get(`/folders/${id}/notes`);
export const createNote = (id, data) => API.post(`/folders/${id}/notes`, data);
export const getNote = (id) => API.get(`/notes/${id}`);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

// missing api
export const login = (username, password) => console.log('logged in with ', username , ' + ', password); // API.post(`/auth/login, data);
export const logout = () => console.log('logout'); // API.post(`/auth/logout);
export const getUsers = () => {
  console.log('Get all users');
  return [
    {
      "id": 1,
      "username": "alice",
      "email": "alice@example.com",
      "passwordHash": "$2b$10$KIXk1zB7Fj1Hz2G0C.VfN.7Y7uE6JXzNzfC9VgxHhQG2k3W8Bk4xG" 
      // plaintext: "password123"
    },
    {
      "id": 2,
      "username": "bob",
      "email": "bob@example.com",
      "passwordHash": "$2b$10$VJj6a/1F5YXlZ3MeCNY8FOWxUOc2jR96O/3bHxj9A0wVv0t/2RZGy"
      // plaintext: "securepass"
    },
    {
      "id": 3,
      "username": "carol",
      "email": "carol@example.com",
      "passwordHash": "$2b$10$Lh3fzFpM7sV1N1TR/2yPoebw5Wz3aFhXehF0w4PwqBsuYyQ5kYv7W"
      // plaintext: "mysecretpwd"
    },
    {
      "id": 4,
      "username": "dave",
      "email": "dave@example.com",
      "passwordHash": "$2b$10$wQzXhQ7K0v1WfMq0qv8Z0eP7xV6U6xK3QH/t0hEoKpD3m2FZ.4kK6"
      // plaintext: "letmein123"
    }
  ]
};
export const getUser = () => {
  console.log('Get the userdata')
  return {
      "id": 4,
      "username": "dave",
      "email": "dave@example.com",
    }
}

export const updateUserPasswordAsUser = (id, password, oldPassword) => console.log('User updated width the id: ', id , 'with the new password of', password, 'old pw: ', oldPassword);
export const updateUserPasswordAsAdmin = (id, password) => console.log('User updated width the id: ', id , 'with the new password of', password);