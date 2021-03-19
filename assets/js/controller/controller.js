
import ProductManager from '../models/productManager.js';
import Home from "../views/home.js";

const products = ProductManager.getProducts();

class Controller{
    home(){
        products.then(product => Home.renderProducts(product))
    }
}

const controller = new Controller();
export default controller;