import axios from 'axios';

const BASE_URL = 'https://novel-project-ntj8t.ampt.app/api';

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/register`, { email, password });
  return response.data;
};

export const getUser = async () => {
  const response = await axios.get(`${BASE_URL}/user`);
  return response.data;
};

export const getJobs = async (params) => {
  const response = await axios.get(`${BASE_URL}/jobs`, { params });
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await axios.get(`${BASE_URL}/jobs/${jobId}`);
  return response.data;
};

export const applyJob = async (jobId) => {
  await axios.post(`${BASE_URL}/jobs/${jobId}/apply`);
};

export const withdrawJob = async (jobId) => {
  await axios.post(`${BASE_URL}/jobs/${jobId}/withdraw`);
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${BASE_URL}/authentication/refreshToken`, { refreshToken });
  return response.data;
};

export const updateUser = async (formData) => {
  const response = await axios.put(`${BASE_URL}/user`, formData);
  return response.data;
};