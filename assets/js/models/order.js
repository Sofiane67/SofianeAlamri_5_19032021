import {inputElement, formBtn, totalOrder} from "../helpers/dom.js";
import { stringVerif } from "../helpers/functions.js";

export default class Order{
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
                    if (data[0] !== "address" && /[0-9]/g.test(data[1])){
                        return;
                    }else{
                        contact[data[0]] = data[1];
                    }
                    
                }
            }else if(data[0] === "email"){
                if (/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(data[1])) {
                    contact[data[0]] = data[1];
                }
            }
        })

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
        .then(res => {

            if(!res.ok || res.status === 400){
                throw new Error()
            } 
            
            return res.json();
        })
        .then(data => {
            const orderId = data.orderId;
            console.log("send")
            localStorage.removeItem("cameras");
            window.location.href = `/pages/confirmation.html?orderId=${orderId}&total=${totalOrder.textContent}`;
        }).catch(() => {
            document.querySelector(".alert--red").classList.remove("alert--hidden");
            setTimeout(() => document.querySelector(".alert--red").classList.add("alert--hidden"), 2000);
    });
    }

}

