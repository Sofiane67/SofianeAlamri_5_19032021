import {selectElement} from "../helpers/dom.js";
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

    addToCart(e){
        e.preventDefault();
        const param = e.target.dataset.id;

        products.then(products => {
            const product = findOneProduct(products, param);

            const newCart = {
                _id: product._id, 
                name: product.name, 
                imageUrl: product.imageUrl,
                price: product.price, 
                lense: selectElement.value
            };

            console.log(newCart)
            
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

    cartPage(){
        const products = JSON.parse(localStorage.getItem("cameras"));

        console.log(products)
        View.renderCartPage(products)
    }
}

const controller = new Controller();
export default controller;