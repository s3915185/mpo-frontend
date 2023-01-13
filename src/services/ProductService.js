import axios from "axios";

class ProductService {

    getProducts() {
        return axios.get(`http://localhost:8080/api/products`);
    }
    getCategories() {
        return axios.get(`http://localhost:8080/api/categories`);
    }
    getInventories() {
        return axios.get(`http://localhost:8080/api/inventories`);
    }
    getManufacturingOrders() {
        return axios.get(`http://localhost:8080/api/mo`);
    }
    getMaterialPurchaseOrders() {
        return axios.get(`http://localhost:8080/api/mpo`);
    }
}

export default new ProductService();