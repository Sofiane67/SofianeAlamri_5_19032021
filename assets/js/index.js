import {getUrlParams} from "./helpers/functions.js";
import { btnAddToart } from "./helpers/dom.js";
import controller from "./controller/controller.js"

if (!getUrlParams()){
    controller.home();
}else{
    controller.productPage();
    btnAddToart.addEventListener("click", controller.addToCart.bind(controller));
}