import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/api",
});

const auth = () => {
  if (localStorage.getItem("token")) {
    return (instance.defaults.headers.common[
      "Authorization"
    ] = localStorage.getItem("token"));
  }
  return;
};

auth();

export default instance;
