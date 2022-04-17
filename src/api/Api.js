import axios from 'axios';

const url = 'http://localhost:5000';

// export const createPost = (newProduct) => axios.post(url, newProduct);

//User
export const loginUser = (data) => axios.post(`${url}/user/login`, data);
export const testUser = () => axios.post(`${url}/user/test`);
export const getAllUsers = () => axios.get(`${url}/user`)

//Project
export const getUserProjects = () => axios.get(`${url}/project`);
export const getImagesByProject = (data) => axios.post(`${url}/projects/path`, data);
export const createProject = (data) => axios.post(`${url}/project/create`, data);
export const getAllProjects = () =>axios.get(`${url}/project/all`);
export const deleteProject = (id) => axios.delete(`${url}/project/delete/${id}`);


//Image
export const getImageSets = () => axios.get(`${url}/image`);

//Rubric
export const getRubrics = () => axios.get(`${url}/rubric`);
export const createRubric = (rubric) => axios.post(`${url}/rubric/create`, rubric);
export const deleteRubric = (id) => axios.delete(`${url}/rubric/${id}`);

//Testing
export const sendMsg = (msg) => axios.post(url, msg);
