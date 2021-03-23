import controller from "./controller/controller.js"
import { btnAddToart, productsContainer } from "./helpers/dom.js";

const page = new URL(window.location.href).pathname;

switch(page){
    case "/pages/produit.html":
        controller.productPage();
        btnAddToart.addEventListener("click", controller.addToCart.bind(controller));
        break;
    case "/pages/panier.html":
        controller.cartPage();
        productsContainer.addEventListener("click", controller.removeProduct.bind(controller));
        controller.sendOrder();
        break;
    case "/pages/confirmation.html":
        console.log("ok");
        break;
    default: controller.home();
}

