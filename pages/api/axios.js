import axios from "axios";
const BASE_URL = process.env.BACKEND_BASEURL;
let token = "";
if (typeof window !== "undefined") {
  token = JSON.parse(localStorage.getItem("token"));
}
export default axios.create({
  baseURL: BASE_URL,
});
