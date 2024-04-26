// api.js
import axios from 'axios';
import { getAccessToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});
const BASE_URL = 'http://localhost:5000/api/v1';
export const setAuthToken = () => {
  const token = getAccessToken();
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
export const uploadImage = async (file) => {
  try {
    const image = new FormData();
    image.append('image', file);
    const response = await axios.post(`${BASE_URL}/auth/upload-image`, image);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addNews = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/addNews`, data);
    console.log(response)
    console.log('Response from API:', response.data);
    return response.data; // Trả về dữ liệu từ phản hồi của API
  } catch (error) {
    console.error('Error posting to API:', error);
    throw error; // Ném lỗi để xử lý ở một nơi khác nếu cần
  }
};
export default api;
