import axios from "axios";
import api from "./api"; //this is for authenicationed routes

export const getMessages = async () => {
  try {
    const response = await api.get("/messages");
    return response.data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    throw error;
  }
};

export const getConversation = async (username) => {
  try {
    const response = await api.get(`/messages/${username}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    throw error;
  }
};

export const sendMessage = async (username, formData) => {
  try {
    console.log(formData.get("body"));
    console.log(formData.get("imgMsg"));
    const response = await api.post(`/messages/${username}`, formData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error sending message:", error);
    throw error;
  }
};

const API_URL_GET_MESSAGES = import.meta.env.VITE_API_URL_GET_MESSAGES;
