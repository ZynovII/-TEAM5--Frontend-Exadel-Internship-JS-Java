import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: { "Content-Type": "application/json" },
});

export const axiosBlob = axios.create({
  responseType: "blob",
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/pdf",
  },
});

if (localStorage.getItem("token")) {
  axiosApi.defaults.headers.common["Authorization"] = localStorage.getItem(
    "token"
  );
}

export default axiosApi;
