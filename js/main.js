const game = {
    player: {
        name: '',
        level: 1,
        health: 100,
        exp: 0,
        gold: 0,
        inventory: [],

    },
    missions: [],
};

import { loadJSON } from './dataLoader.js';

async function initializeGame() {
    try {
        // Charge le fichier JSON contenant les missions
        game.missions = await loadJSON('data/missions.json');
        console.log('Missions chargées :', game.missions);

        // Tu pourras ensuite appeler d'autres fonctions d'initialisation ici
        // ex : displayAvailableMissions();

    } catch (error) {
        console.error('Erreur lors du chargement des missions :', error);
    }
}

// Appelle la fonction d'initialisation au démarrage du jeu
initializeGame();