import axios from "axios";
const callApi = axios.create({ baseURL: "http://localhost:3000" });
export default callApi;
