import {productsContainer} from "../helpers/dom.js"

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
}