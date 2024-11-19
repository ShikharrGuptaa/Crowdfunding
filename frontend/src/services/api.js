import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true, // For cookies
});

export const getEvents = () => API.get("/events");
export const logoutUser = () => API.post("/auth/logout");
export const getUserById = (id) => API.get(`/users/${id}`);
export const getEventById = (id) => API.get(`/events/${id}`);
export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);
export const createEvent = (data) => API.post("/events/create", data);

export const getCheckoutURL = async (eventId, amount, contributorId) => {
  try {
    const response = await API.post(`/payments/initiate-contribution`, {
      eventId,
      amount,
      contributorId,
    });
    return response.data.url; // Returning only the checkout URL
  } catch (err) {
    console.error("Error fetching checkout URL:", err);
    throw err;
  }
};

export const fetchCurrentUserId = async () => {
  try {
    const response = await API.get("/auth/user");
    return response.data.userId;
  } catch (err) {
    console.error("Error fetching current user ID:", err);
    return null;
  }
};
