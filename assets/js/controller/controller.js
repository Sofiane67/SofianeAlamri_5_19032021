import {selectElement} from "../helpers/dom.js";
import { findOneProduct } from "../helpers/functions.js";
import ProductManager from '../models/productManager.js';
import Product from "../views/product.js";


const products = ProductManager.getProducts();

class Controller{
    cart = [];
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

    addToCart(e){
        e.preventDefault();
        const param = e.target.dataset.id;

        products.then(products => {
            const product = findOneProduct(products, param);

            const newCart = {
                id: product._id, 
                name: product.name, 
                image: product.image, 
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
            console.log(JSON.stringify(dataToBeStored))
            localStorage.setItem("cameras", JSON.stringify(dataToBeStored));
        })
    }

    handler(e){
        e.preventDefault();
        console.log(e);
    }
}

const controller = new Controller();
export default controller;