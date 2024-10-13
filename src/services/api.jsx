import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyapi.online/api',
});

export const fetchEmployees = () => apiClient.get('/users');
export const fetchEmployeeById = (id) => apiClient.get(`/users/${id}`);
