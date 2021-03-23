/**
 * Récupère les paramètres d'une URL
 * @param  {...String | String} param Peut prendre en argument un ou plusieurs noms de paramètre d'url
 * @returns {String | Object} Peut retourné un seul paramètre ou plusieurs sous forme d'un objet
 */
export const getUrlParams = (...param) => {
    if(param.length < 2){
        return new URL(window.location.href).searchParams.get("id")
    }else{
        const params = {};
        param.map(param => params[param] = new URL(window.location.href).searchParams.get(param));
        return params;
    }
}

/**
 * 
 * @param {Array} datas Tableau des produits retourné par l'API
 * @param {String} param L'identifiant du produit envoyé dans l'url
 * @returns {Object} Retourne un objet contenant le produit dont l'id correspond à param
 */
export const findOneProduct = (datas, param) => datas.find(data => data._id === param);

/**
 * Teste si une chaine de caractère contient un caractère spécial
 * @param {String} str La chaine de caracètre à tester
 * @returns {Boolean}
 */
export const stringVerif = (str) => {
    let result = false;
    const specialChar = [",", "?", ";", ".", ":", "/", "!", "§", "&", "~", '"', "#", "{", "(", "[", "-", "|", "`", "_", "\\", "^", "@", ")", "]", "=", "}", "¨", "$", "£", "¤", "%", "µ", "*"];

    specialChar.map(char => {
        if (str.includes(char)) {
            result = true
        }
    })

    return result;
}