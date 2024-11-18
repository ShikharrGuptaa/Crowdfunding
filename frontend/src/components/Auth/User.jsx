import axios from "axios";

const fetchCurrentUserId = async () => {
  try {
    const response = await axios.get("http://localhost:5000/auth/user", {
      withCredentials: true,
    });
    return response.data.userId;
  } catch (err) {
    console.error("Error fetching current user ID:", err);
    return null;
  }
};
