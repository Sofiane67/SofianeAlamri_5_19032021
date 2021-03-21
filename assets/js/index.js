import controller from "./controller/controller.js"
import { btnAddToart, removeBtn, productsContainer } from "./helpers/dom.js";

const page = new URL(window.location.href).pathname;

switch(page){
    case "/pages/produit.html":
        controller.productPage();
        btnAddToart.addEventListener("click", controller.addToCart.bind(controller));
        break;
    case "/pages/panier.html":
        controller.cartPage();
        productsContainer.addEventListener("click", controller.removeProduct.bind(controller));
        break;
    default: controller.home();
}