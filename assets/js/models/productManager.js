export default class ProductManager{

    /**
     * Effectue un appel API pour récupérer les données
     * @returns {Array} Retourne un tableau d'objets
     */
    static async getProducts(){
        try{
            const response = await fetch("http://localhost:3000/api/cameras");

            if (!response.ok) throw new Error("Une erreur inatendu s'est produit");

            const data = await response.json();
            return data;

        }catch(error){
            console.error(error.message)
        }
    }
}
