import axios from "axios";
import api from "./api";

const API_URL_LOGIN = import.meta.env.VITE_API_URL_LOGIN;
const API_URL_CREATE = import.meta.env.VITE_API_URL_CREATE;

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL_LOGIN, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    throw error;
  }
};

export const signupUser = async (username, email, password, confirmPw) => {
  try {
    const response = await axios.post(API_URL_CREATE, {
      username: username,
      email: email,
      password: password,
      confirmPw: confirmPw,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    throw error;
  }
};

export const getUser = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const response = await api.get(`/users/allusers`);
    return response.data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    throw error;
  }
};

export const uploadProfilePic = async (formData) => {
  try {
    const response = await api.post(`/users/upload`, formData);
    return response.data;
  } catch (error) {
    console.log("Error uploading file:", error);
    throw error;
  }
};

export const editBio = async (username, formData) => {
  try {
    const response = await api.put(`/users/${username}`, { bio: formData });
    return response.data;
  } catch (error) {
    console.log("Error uploading bio:", error);
    throw error;
  }
};
