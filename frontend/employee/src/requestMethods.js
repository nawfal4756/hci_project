import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

const setHeader = () => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const TOKEN = currentUser?.accessToken;
  return new Promise((resolve) => {
    axios.interceptors.request.use(
      (config) => {
        config.headers = {
          ...config.headers,
          token: `Bearer ${TOKEN}`,
        };
        return resolve(config);
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  });
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const employeeRequest = axios.create({
  transformRequest: async (_data, headers) => {
    await setHeader(headers);
  },
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
