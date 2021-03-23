import {productsContainer, form, selectElement, btnAddToart} from "../helpers/dom.js";
import {getUrlParams, findOneProduct} from "../helpers/functions.js";

export default class RenderProduct{
    /**
     * Génére un template html pour afficher un produit
     * @param {Array} data Tableau retourné par l'api fetch contenant tous les produits
     * @returns {String}
     */
    static template(data){
        const page = new URL(window.location.href).pathname;
        return `
            <figure class="camera">
                <div class="camera__img-box">
                    <img src="${data.imageUrl}" alt="" class="camera__img">
                </div>
                <figcaption class="camera__caption">
                    <p class="camera__name">${data.name}</p>
                    ${getUrlParams("id") ? `<p class="camera__description">${data.description}</p>`:""}
                    <p class="camera__price">${data.price}€</p>
                    ${page === "/pages/panier.html" ? `<button class="btn btn--delete" data-id="${data._id}">Supprimer</button>`:""}
                </figcaption>
            </figure>
        `;
    }

    /**
     * Affiche sur la page d'accueil tous les produits retournés par l'API
     * @param {Array} products Tableau retourné par l'api fetch
     */
    static renderHomePage(products){
        products.map(product => productsContainer.insertAdjacentHTML("afterbegin", `<a href="/pages/produit.html?id=${product._id}" class="card">${this.template(product)}</a>`));
    }

    /**
     * Récupère un produit en fonction du paramètre de l'url et l'affiche
     * @param {Array} products Tableau retourné par l'api fetch
     */
    static renderOneProduct(products){
        const param = getUrlParams();

        //Récupère le produit correspondant a l'id en paramètre
        const oneProduct = findOneProduct(products, param);

        productsContainer.insertAdjacentHTML("afterbegin", `<div class="card card--product-page">${this.template(oneProduct)} </div>`);
        btnAddToart.setAttribute("data-id", param);

        oneProduct.lenses.forEach(lense => selectElement.insertAdjacentHTML("afterbegin", `<option value="${lense}">${lense}</option>`));
    }

    /**
    * Affiche sur la page panier tous les produits stocké dans le localStorage
    * @param {Array} products Tableau retourné par localStorage
    */
    static renderCartPage(products) {
        let html = "";

        if (!products){
            html = "<p class='emptyCart'>Le panier est vide</p>"
        }else{
            products.map(product => {
                form.classList.remove("hidden");

                html += `
                    <div class="card card--cart-page">
                    ${this.template(product)}
                    </div>
                `
            });
        }

        productsContainer.insertAdjacentHTML("afterbegin", html);
    }
}