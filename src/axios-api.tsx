import axios, { AxiosRequestConfig } from "axios";

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

const authInterceptor = (config: AxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

axiosApi.interceptors.request.use(authInterceptor);
axiosApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status == 403) {
      localStorage.removeItem("token");
      window.location.assign("/");
    }
    return Promise.reject(err);
  }
);

export default axiosApi;
