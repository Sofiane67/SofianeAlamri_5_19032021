import {inputElement, formBtn} from "../helpers/dom.js";
import { stringVerif } from "../helpers/functions.js";

export default class Order{
    readyToSend;
    contactProperties = [];

    constructor(){
        formBtn.addEventListener("click", this.send.bind(this));
    }

    /**
     * Teste la validité des informations saisi par l'utilisateur
     * @returns {Object} Retourne un objet { firstName: string, lastName: string, address: string, city: string,email: string}
     */
    dataValidation(){

        const dataToBeTest = [];
        const contact = {};

        for (const key in inputElement) {
            dataToBeTest.push([key, inputElement[key].value]);
        }
       
        //Teste la validité des informations saisie par l'utilisateur
        dataToBeTest.map(data => {
            if(data[0] !== "email"){
                if(!stringVerif(data[1])){
                    contact[data[0]] = data[1];
                }
            }else if(data[0] === "email"){
                if (/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(data[1])) {
                    contact[data[0]] = data[1];
                }
            }

            this.contactProperties.push(data[0]);
        })

        //Teste si l'objet contact possède toutes les prorpiétés requise afin de determiner si toutes les informations necessaires à l'envoi du formulaire sont présentes
        for (const property of this.contactProperties) {
            if (!contact.hasOwnProperty(property)){
                this.readyToSend = false;
                break;
            }else{
                this.readyToSend = true;
            }
        }
        
        return contact;
    }

    /**
     * 
     * @returns {Array} Retoune un tableau contenant les id des produits présents dans le panier
     */
    getProductId(){
        const product_id = [];
        const productsStored = JSON.parse(localStorage.getItem("cameras"));
        productsStored.map(product => product_id.push(product._id))
        return product_id;
    }

    /**
     * Envoi du formulaire
     * @param {Object} e Objet Event
     */
    send(e){
        e.preventDefault();
    
        const contact = this.dataValidation();
        if (!this.readyToSend) {
            document.querySelector(".alert--red").classList.remove("alert--hidden")
            return
        };

        const products = this.getProductId();
        const dataToBeSend = JSON.stringify({contact,products});

        const header = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: dataToBeSend
        }

        fetch("http://localhost:3000/api/cameras/order", header)
        .then(res => res.json())
        .then(data => {
            const orderId = data.orderId;
            const price = [];
            let total;
            data.products.map(product => {
                price.push(product.price);
                total = price.reduce((total,price) => total + price, 0 );
            })

            localStorage.removeItem("cameras");
            window.location.href = `/pages/confirmation.html?orderId=${orderId}&total=${total}`;
        })
    }

}

