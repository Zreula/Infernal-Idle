// dataLoader.js

/**
 * Charge un fichier JSON depuis le chemin donné et retourne son contenu sous forme d'objet JS.
 * @param {string} path - Le chemin vers le fichier JSON (ex: 'data/missions.json')
 * @returns {Promise<any>} - Une promesse qui résout avec le contenu du JSON.
 */
export async function loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Erreur lors du chargement de ${path} : ${response.statusText}`);
    }
    return await response.json();
}