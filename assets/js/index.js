import {getUrlParams} from "./helpers/functions.js";
import controller from "./controller/controller.js"

if (!getUrlParams()){
    controller.home();
}




