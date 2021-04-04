import {selectElement, orderElement} from "../helpers/dom.js";
import { findOneProduct, getUrlParams } from "../helpers/functions.js";
import ProductManager from '../models/productManager.js';
import View from "../views/renderProduct.js";
import Cart from "../models/cart.js"
import Order from "../models/order.js";


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
       const id = getUrlParams();
       const product = ProductManager.getOneProduct(id);
       product.then(product => View.renderOneProduct(product));
    }

    /**
     * Affiche sur la page panier les produits stockés dans le local storage
     */
    cartPage(){
        new Cart;
    }

    /**
     * Ajoute un produit au panier
     */
    addToCart(e) {
        e.preventDefault();
        const param = e.target.dataset.id;
        const product = ProductManager.getOneProduct(param);

        product.then(product => {
            console.log(product)
            // Création de l'objet correspondant a un produit qui sera stocké dans le local storage
            const newCart = {
                _id: product._id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                lense: selectElement.value,
                quantity: 1
            };


            this.cart.push(newCart);

            let dataToBeStored;

            if (localStorage.getItem("cameras")) {
                const cameras = JSON.parse(localStorage.getItem("cameras"));

                console.log(cameras)

                //Si le produit ajouté au panier existe déja dans le localStorage, on incrémente la quantité de 1
                if (findOneProduct(cameras, product._id)) {

                    const newProduct = findOneProduct(cameras, product._id);
                    newProduct.quantity++;

                    const index = cameras.indexOf(findOneProduct(cameras, product._id));

                    cameras.splice(index, 1);
                    cameras.push(newProduct);

                } else {
                    cameras.push(newCart);
                }


                dataToBeStored = cameras;
            } else {
                dataToBeStored = this.cart;
            }

            //Stock les produits dans le local storage
            localStorage.setItem("cameras", JSON.stringify(dataToBeStored));
        });

        const alertSuccess = document.querySelector(".alert--green");
        alertSuccess.classList.remove("alert--hidden");

        setTimeout(() => alertSuccess.classList.add("alert--hidden"), 2000);
    }

    /**
     * Crée une nouvelle commande (objet Order)
     */
    sendOrder(){
        new Order;
    }

    /**
     * Affichage d'un message de confirmation et du récapitulatif de la commande 
     */
    orderConfirmation(){
        if (!getUrlParams("orderId", "total")) window.location.href = `/`;
        const {orderId, total} = getUrlParams("orderId", "total");
        const { idContent, totalContent} = orderElement;
        idContent.textContent = orderId;
        totalContent.textContent = `${total}€`;
    }
}

const controller = new Controller();
export default controller;