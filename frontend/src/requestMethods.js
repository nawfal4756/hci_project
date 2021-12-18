import axios from "axios";

const BASE_URL = "http://103.86.55.115:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
