/**
 * 
 * @returns Retourne la valeur du paramètre id de l'url
 */
export const getUrlParams = () => new URL(window.location.href).searchParams.get("id");

/**
 * 
 * @param {Array} datas Tableau des produits retourné par l'API
 * @param {String} param L'identifiant du produit envoyé dans l'url
 * @returns Retourne un objet contenant le produit dont l'id correspond à param
 */
export const findOneProduct = (datas, param) => datas.find(data => data._id === param);