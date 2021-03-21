import controller from "./controller/controller.js"
import { btnAddToart } from "./helpers/dom.js";

const page = new URL(window.location.href).pathname;

switch(page){
    case "/pages/produit.html":
        controller.productPage();
        btnAddToart.addEventListener("click", controller.addToCart.bind(controller));
        break;
    case "/pages/panier.html":
        controller.cartPage();
        break;
    default: controller.home();
}