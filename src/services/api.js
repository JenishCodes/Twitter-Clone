import axios from "axios";

export default axios.create({
  // baseURL: process.env.REACT_APP_SERVER_API || "http://127.0.0.1:3001",
  baseURL: "http://127.0.0.1:3001",
});
