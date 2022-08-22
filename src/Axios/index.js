import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": "*",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          return Promise.reject(error);

        default:
          return Promise.reject(error);
      }
    }
  }
);

export default instance;
