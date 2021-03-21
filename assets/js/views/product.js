import {productsContainer} from "../helpers/dom.js";
import {getUrlParams} from "../helpers/functions.js";
import { findOneProduct} from "../helpers/functions.js";
import {selectElement} from "../helpers/dom.js";
import { btnAddToart} from "../helpers/dom.js";

export default class Product{

    /**
     * Génére un template html pour afficher un produit
     * @param {Array} data Tableau retourné par l'api fetch contenant tous les produits
     * @returns 
     */
    static template(data){
        return `
        <a href="pages/produit.html?id=${data._id}" class="card">
            <figure class="camera">
                <div class="camera__img-box">
                    <img src="${data.imageUrl}" alt="" class="camera__img">
                </div>
                <figcaption class="camera__caption">
                    <p class="camera__name">${data.name}</p>
                    <p class="camera__description">${data.description}</p>
                    <p class="camera__price">${data.price}</p>
                </figcaption>
            </figure>
        </a>
        `;
    }

    /**
     * Insére dans le DOM tous les produits retournés par l'API
     * @param {Array} products Tableau retourné par l'api fetch
     */
    static renderProducts(products){
        products.map(product => productsContainer.insertAdjacentHTML("afterbegin", this.template(product))); 
    }

    /**
     * Récupère un produit en fonction du paramètre de l'url et l'affiche
     * @param {Array} products Tableau retourné par l'api fetch
     */
    static renderOneProduct(products){
        const param = getUrlParams();

        //Récupère le produit correspondant a l'id en paramètre
        const oneProduct = findOneProduct(products, param);

        productsContainer.insertAdjacentHTML("afterbegin", this.template(oneProduct));
        btnAddToart.setAttribute("data-id", param);

        oneProduct.lenses.forEach(lense => selectElement.insertAdjacentHTML("afterbegin", `<option value="${lense}">${lense}</option>`));
    }
}