
import ProductManager from '../models/productManager.js';
import Product from "../views/product.js";
const products = ProductManager.getProducts();

class Controller{
    /**
     * Traite les données rerounées par l'API et utilise la methode renderProducts de la class home pour afficher les produits sur la page d'accueil
     */
    home(){
        products.then(products => Product.renderProducts(products))
    }
}

const controller = new Controller();
export default controller;