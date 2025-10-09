import axios from "axios";

const API_URL = "http://localhost:8080/api/users"; // Spring Boot backend

const createUser = (user) => axios.post(API_URL, user);
const getUsers = () => axios.get(API_URL);
const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
