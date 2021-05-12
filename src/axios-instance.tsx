import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081/api'
})

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

export default instance;