import axios from "axios";


const api = axios.create({
    baseURL: "https://sw1-parcial2.adaptable.app/api",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export const convertToJSONString = (obj) => {
    return JSON.stringify(obj);
  }

  export default api;