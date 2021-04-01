import controller from "./controller/controller.js"
import { btnAddToart, btnScrollTo} from "./helpers/dom.js";
import {scrollTo} from "./helpers/functions.js";

const page = new URL(window.location.href).pathname;

switch(page){
    case "/pages/produit.html":
        controller.productPage();
        btnAddToart.addEventListener("click", controller.addToCart.bind(controller));
        break;
    case "/pages/panier.html":
        controller.cartPage();
        controller.sendOrder();
        break;
    case "/pages/confirmation.html":
        controller.orderConfirmation();
        break;
    default: 
    controller.home();
    btnScrollTo.addEventListener("click", scrollTo);
}