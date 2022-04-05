import axios from 'axios';

const url = 'http://localhost:5000';

// export const createPost = (newProduct) => axios.post(url, newProduct);
export const loginUser = (data) => axios.post(`${url}/user/login`, data);
export const testUser = () => axios.post(`${url}/user/test`);

export const getUserProjects = () => axios.get(`${url}/project`);

export const sendMsg = (msg) => axios.post(url, msg);
export const fetchUsers = () => axios.get(`${url}/user`);

export const getImagesByProject = (data) => axios.post(`${url}/projects/path`, data);