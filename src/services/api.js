import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept";

// "", "Origin, X-Requested-With, Content-Type, Accept"
const api = axios.create({
  baseURL: "https://apiprototiposh1.woli.com.br",
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

export default api;
