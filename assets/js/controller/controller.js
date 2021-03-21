
import ProductManager from '../models/productManager.js';
import Product from "../views/product.js";
const products = ProductManager.getProducts();

class Controller{
    
    /**
     * Affiche tous les produits sur la page d'accueil
     */
    home(){
        products.then(products => Product.renderProducts(products))
    }

    /**
    * Affiche un produit sur la page produit
    */
    productPage(){
        products.then(products => Product.renderOneProduct(products))
    }
}

const controller = new Controller();
export default controller;