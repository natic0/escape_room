import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const URL = "https://escape-room-backend.onrender.com"

const client = axios.create({
  baseURL: `${URL}/users`,
});

export const signup = async (data) => {
  try {
    const { username, email, password } = data;
    let result = await client.post(
      "/api/register/",
      {
        username: username,
        email: email,
        password: password
      }
    );
    return result;
  } catch (error) {
    console.error("Error:", error.response.data);
    return "Connection failed";
  }
};

export const login = async (data) => {
  try {
    const { email, password } = data;
    let result = await client.post(
      "/api/login/",
      {
        email: email,
        password: password
      }
    );
    return result;
  } catch (error) {
    console.error("Error:", error.response.data);
    return "Connection failed";
  }
};

export const logout = async () => {
  try {
    let result = await client.post(
      "/api/logout/",
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    console.error("Error:", error.response.data);
    return "Connection failed";
  }
};