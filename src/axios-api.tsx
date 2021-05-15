import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:8081/api",
});

export const axiosBlob = axios.create({
  responseType: 'blob',
  baseURL: "http://localhost:8081/api",
  headers: {
      'Content-Type': 'application/pdf',
  },
  });

(() => {
  if (localStorage.getItem("token")) {
    return (axiosApi.defaults.headers.common[
      "Authorization"
    ] = localStorage.getItem("token"));
  }
  return;
})();

export default axiosApi;
