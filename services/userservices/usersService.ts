import { BASE_URL } from '@/config';
import axios from 'axios';


const userService: any = axios.create({
  baseURL: BASE_URL,
});

userService.getUsersList = async () => {
  try {
    const response = await userService.get('/users/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching users list:', error);
    throw error;
  }
};

userService.getUserById = async (id: any) => {
  try {
    const response = await userService.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users list:', error);
    throw error;
  }
};
userService.addUser = async (userData: any) => {
  try {
    const response = await userService.post('/users/add', userData);
    return response.data;
  } catch (error) {
    console.error('Error fetching users list:', error);
    throw error;
  }
};
userService.editUser = async (userData: any, id: any) => {
  try {
    const response = await userService.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error fetching users list:', error);
    throw error;
  }
};

userService.deleteUserById = async (id: any) => {
  try {
    const response = await userService.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users list:', error);
    throw error;
  }
};
export default userService;
