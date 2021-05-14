import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:8081/api",
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
