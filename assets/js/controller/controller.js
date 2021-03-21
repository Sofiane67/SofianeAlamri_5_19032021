
import ProductManager from '../models/productManager.js';
import Home from "../views/home.js";

const products = ProductManager.getProducts();

class Controller{
    /**
     * Traite les données rerounées par l'API et utilise la methode renderProducts de la class home pour afficher les produits sur la page d'accueil
     */
    home(){
        products.then(products => Home.renderProducts(products))
    }
}

const controller = new Controller();
export default controller;