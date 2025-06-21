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
    activeMissions: [],
};

import { loadJSON } from './dataLoader.js';

async function initializeGame() {
    try {
        // Charge le fichier JSON contenant les missions
        game.missions = await loadJSON('data/missions.json');
        console.log('Missions chargées :', game.missions);

        // Tu pourras ensuite appeler d'autres fonctions d'initialisation ici
        displayAvailableMissions();

    } catch (error) {
        console.error('Erreur lors du chargement des missions :', error);
    }
}

// Appelle la fonction d'initialisation au démarrage du jeu
initializeGame();

// Affiche toutes les missions dans le conteneur HTML prévu
function displayAvailableMissions() {
    const container = document.getElementById('missions-list');
    container.innerHTML = ''; // On vide le conteneur au cas où

    // On parcourt chaque mission chargée dans game.missions
    game.missions.forEach(mission => {
        // Création du bloc principal pour chaque mission
        const missionDiv = document.createElement('div');
        missionDiv.classList.add('mission-card');

        // Titre de la mission
        const nameElem = document.createElement('h3');
        nameElem.textContent = mission.name;
        missionDiv.appendChild(nameElem);

        // Description de la mission
        const descElem = document.createElement('p');
        descElem.textContent = mission.description;
        missionDiv.appendChild(descElem);

        // Récompenses
        const rewardsList = document.createElement('ul');
        rewardsList.classList.add('rewards');

        if (mission.rewards?.exp) {
            const expItem = document.createElement('li');
            expItem.innerHTML = `<strong>EXP :</strong> ${mission.rewards.exp}`;
            rewardsList.appendChild(expItem);
        }
        if (mission.rewards?.gold) {
            const goldItem = document.createElement('li');
            goldItem.innerHTML = `<strong>Or :</strong> ${mission.rewards.gold}`;
            rewardsList.appendChild(goldItem);
        }
        if (mission.rewards?.items && mission.rewards.items.length > 0) {
            const itemsItem = document.createElement('li');
            itemsItem.innerHTML = `<strong>Objets :</strong> ${mission.rewards.items.join(', ')}`;
            rewardsList.appendChild(itemsItem);
        }
        missionDiv.appendChild(rewardsList);

        // Conditions (ex : échec si mort)
        if (mission.conditions?.failOnDeath) {
            const condElem = document.createElement('div');
            condElem.classList.add('conditions');
            condElem.innerHTML = `<em>Échec si mort</em>`;
            missionDiv.appendChild(condElem);
        }
        // Vérifie si la mission est déjà acceptée
        const isActive = game.activeMissions.some(activeMission => activeMission.name === mission.name);

        if (isActive) {
            // Si oui, affiche l'indication "Mission en cours"
            const inProgressElem = document.createElement('div');
            inProgressElem.classList.add('mission-in-progress');
            inProgressElem.textContent = "Mission en cours";
            missionDiv.appendChild(inProgressElem);
        } else {
            // Sinon, ajoute le bouton "Prendre la mission"
            const btn = document.createElement('button');
            btn.textContent = "Prendre la mission";
            btn.classList.add('accept-mission-btn');
            btn.addEventListener('click', () => {
                // Ajoute la mission aux actives
                game.activeMissions.push(mission);
                // Réaffiche la liste pour mettre l'interface à jour
                displayAvailableMissions();
            });
            missionDiv.appendChild(btn);
        }
        
        // Ajout du bloc mission au conteneur principal
        container.appendChild(missionDiv);
    });
}