import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/api",
});

const user = () => {
  let user = "Unauthorizated";

  if (localStorage.getItem("token")) {
    user = localStorage.getItem("token");
  }

  return user;
};

instance.defaults.headers.common["Authorization"] = user;

export default instance;
