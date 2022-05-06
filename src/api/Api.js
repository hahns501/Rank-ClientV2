import axios from 'axios';

const url = 'http://localhost:5000';
// const url = 'https://image-ranker-server.herokuapp.com';
// export const createPost = (newProduct) => axios.post(url, newProduct);

//User
export const loginUser = (data) => axios.post(`${url}/user/login`, data);
export const testUser = () => axios.post(`${url}/user/test`);
export const getAllUsers = () => axios.get(`${url}/user`)
export const registerUser = (data) => axios.post(`${url}/user/register`,data);

//Project
export const getUserProjects = () => axios.get(`${url}/project`);
export const getImagesByProject = (data) => axios.post(`${url}/project/path`, data);
export const getUserProjectDetails = (id) => axios.get(`${url}/project/detail/${id}`);
export const createProject = (data) => axios.post(`${url}/project/create`, data);
export const getAllProjects = () =>axios.get(`${url}/project/all`);
export const deleteProject = (id) => axios.delete(`${url}/project/delete/${id}`);
export const submitProjectData = (data) => axios.post(`${url}/project/submit`, data);

//Image
export const getImageSets = () => axios.get(`${url}/image`);
export const uploadImages = (files) => axios.post(`${url}/image/upload`, files);

//Rubric
export const getRubrics = () => axios.get(`${url}/rubric`);
export const createRubric = (rubric) => axios.post(`${url}/rubric/create`, rubric);
export const deleteRubric = (id) => axios.delete(`${url}/rubric/${id}`);

//Testing
