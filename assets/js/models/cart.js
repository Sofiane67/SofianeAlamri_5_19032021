import View from "../views/renderProduct.js";
import { tableBody, formContent, table, totalOrder} from "../helpers/dom.js";
import { findOneProduct } from "../helpers/functions.js";

export default class Cart{

    constructor(){
        tableBody.addEventListener("click", this.lessQuantity.bind(this));
        tableBody.addEventListener("click", this.removeProduct.bind(this));
        this.cartPage();
    }

    /**
     * Gére l'affichage sur la page
     */
    cartPage() {
        const products = JSON.parse(localStorage.getItem("cameras"));

        if(!products){
            formContent.classList.add("hidden");
            table.classList.add("hidden");
        };

        View.renderCartPage(products);
    }

    /**
     * Effectue un appel ajax et met à jour l'affichage de la page panier sans recharger la page
     */
    renderPageWithAjax(){
        fetch("http://127.0.0.1:8080/pages/panier.html").then(() => {
            tableBody.innerHTML = "";
            totalOrder.innerHTML = "";
            this.cartPage();
        });
    }

    /**
     *Supprime un produit du panier
     */
    removeProduct(e) {

        if (e.target.classList.contains("cart-array__btn--delete")){
            const id = e.target.dataset.id;

            const productStored = JSON.parse(localStorage.getItem("cameras"));
            const productToBeRemoved = findOneProduct(productStored, id);
            const index = productStored.indexOf(productToBeRemoved);

            console.log(id)

            productStored.splice(index, 1);

            this.localStorageManager(productStored);

            //Mise à jour de l'affichage sans recharger la page
            this.renderPageWithAjax();
             
        }
    }

    /**
     * Cette fonction est un eventListener qui met à jour la quantité d'un produit dans le panier lorsqu'on clic sur les boutons moins ou plus.
     * Lorsque la quantité d'un porduit est éduite a 0, le produit est automatiquement supprimé du panier.
     * Si un seul produit est dans le panier et que sa quantité est réduite à 0, le localstorage est vidé automatiquement.
     * L'affichage de la quantitée et du prix total se met à jour automatiquement.
     * @param {Object} e Objet event
     * @returns 
     */
    lessQuantity(e){

        if (!e.target.classList.contains("cart-array__btn--quantity")) return;

        const productStored = JSON.parse(localStorage.getItem("cameras"));
        let id = e.target.dataset.id;
        let productTarget = findOneProduct(productStored, id);
        let index = productStored.indexOf(productTarget);
        let productUpdated = {};
        
        if (e.target.classList.contains("cart-array__btn--more")){

            e.target.previousElementSibling.value++;
            productTarget.quantity++;
            productUpdated = { ...productTarget};

        } else if (e.target.classList.contains("cart-array__btn--less")){

            if (e.target.nextElementSibling.value == 0) {
                return;
            }

            e.target.nextElementSibling.value--;
            productTarget.quantity--;
            productUpdated = { ...productTarget };
        }

       
        productStored[index] = productUpdated;

        if (productUpdated.quantity < 1) {
            productStored.splice(index, 1);
        }

        this.localStorageManager(productStored);

        //Mise à jour de l'affichage sans recharger la page
        this.renderPageWithAjax();
    }

    /**
     * Vide le localStorage si le te tableau passé en paramètre est vide sinon le met à jour
     * @param {Array} productStored Tableau d'objet à strocker
     */
    localStorageManager(productStored){
        if (productStored < 1) {
            localStorage.removeItem("cameras");
        } else {
            localStorage.setItem("cameras", JSON.stringify(productStored));
        }
    }
}