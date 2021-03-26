import {productsContainer, form, selectElement, btnAddToart, tableBody} from "../helpers/dom.js";
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
                    <p class="camera__price">${data.price/100}€</p>
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
                <tr>
                    <td>
                        <img src="${product.imageUrl}" alt="" class="cart-array__image">
                    </td>
                    <td>${product.name}</td>
                    <td>2099€</td>
                    <td>
                        <button class="cart-array__btn cart-array__btn--less">-</button>
                        <input type="text" class="cart-array__quantity" value="${product.quantity}">
                        <button class="cart-array__btn cart-array__btn--more">+</button>
                    </td>
                    <td>${product.price/100}€</td>
                    <td>
                        <button class="cart-array__btn cart-array__btn--delete" data-id=${product._id}>Supprimer</button>
                    </td>
                </tr>
                `
            });
        }

        tableBody.insertAdjacentHTML("afterbegin", html);
    }
}