import {selectElement, removeBtn} from "../helpers/dom.js";
import { findOneProduct } from "../helpers/functions.js";
import ProductManager from '../models/productManager.js';
import View from "../views/renderProduct.js";


const products = ProductManager.getProducts();

class Controller{
    cart = [];
    /**
     * Affiche tous les produits sur la page d'accueil
     */
    home(){
        products.then(products => View.renderHomePage(products))
    }

    /**
    * Affiche un produit sur la page produit
    */
    productPage(){
        products.then(products => View.renderOneProduct(products))
    }

    /**
     * Affiche sur la page panier les produits stockés dans le local storage
     */
    cartPage() {
        const products = JSON.parse(localStorage.getItem("cameras"));
        View.renderCartPage(products)
    }
    
    /**
     * Ajoute un produit au panier
     */
    addToCart(e){
        e.preventDefault();
        const param = e.target.dataset.id;

        products.then(products => {
            const product = findOneProduct(products, param);

            // Création de l'objet correspondant a un produit qui sera stocké dans le local storage
            const newCart = {
                _id: product._id, 
                name: product.name, 
                imageUrl: product.imageUrl,
                price: product.price, 
                lense: selectElement.value
            };
            
            this.cart.push(newCart);        

            let dataToBeStored;

            if(localStorage.getItem("cameras")){
                const cameras = JSON.parse(localStorage.getItem("cameras"));
                cameras.push(newCart)
                dataToBeStored = cameras;
            }else{
                dataToBeStored = this.cart;
            }
             //Stock les produits dans le local storage
            localStorage.setItem("cameras", JSON.stringify(dataToBeStored));
        })
    }

    /**
     *Supprime un produit du panier
     */
    removeProduct(e){
        const id = e.target.dataset.id;

        const productStored = JSON.parse(localStorage.getItem("cameras"));
        productStored.splice(id, 1);
        localStorage.setItem("cameras", JSON.stringify(productStored));
        document.location.reload();
    }
}

const controller = new Controller();
export default controller;