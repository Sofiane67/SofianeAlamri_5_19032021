/**
 * 
 * @returns Retourne la valeur du paramètre id de l'url
 */
export const getUrlParams = () => new URL(window.location.href).searchParams.get("id");

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