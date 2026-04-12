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

const API_URL_GET_MESSAGES = import.meta.env.VITE_API_URL_GET_MESSAGES;
