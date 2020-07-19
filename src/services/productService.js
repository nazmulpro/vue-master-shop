import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export default {
  getProducts(perPage, page) {
    return apiClient.get("/products?_limit=" + perPage + "&_page=" + page);
  },
  getProduct(id) {
    return apiClient.get("/products/" + id);
  },
};
