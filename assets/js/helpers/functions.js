/**
 * 
 * @returns Retourne la valeur du paramètre id de l'url
 */
export const getUrlParams = () => new URL(window.location.href).searchParams.get("id");