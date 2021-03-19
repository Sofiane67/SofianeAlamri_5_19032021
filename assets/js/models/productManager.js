
export default class ProductManager{
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
