import axios from 'axios';

const API_URL = 'https://student-list-backend-j78w.onrender.com/api';

export const fetchStudents = () => axios.get(`${API_URL}/students`);
export const createStudent = (data: unknown) => axios.post(`${API_URL}/students`, data);
export const updateStudent = (id: string, data: unknown) => axios.put(`${API_URL}/students/${id}`, data);
export const deleteStudent = (id: string) => axios.delete(`${API_URL}/students/${id}`);
