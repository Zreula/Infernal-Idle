import { game } from './main.js';

export function startCombat(enemyId, container) {
    const enemy = game.enemies.find(e => e.id === enemyId);
    if (!enemy) {
        displayCombatResult("Enemy not found!", container);
        return;
    }

    // Affiche la progress bar de temps dans le conteneur de l'area
    displayCombatResult(`
        <div id="combat-log">Preparing to fight ${enemy.name}...</div>
        <div class="combat-timer-bar">
            <div class="combat-timer-bar-bg">
                <div class="combat-timer-bar-fg" style="width:100%"></div>
            </div>
        </div>
    `, container);

    const combatDuration = 5000; // 5 secondes
    let timerElapsed = 0;
    const timerInterval = setInterval(() => {
        timerElapsed += 50;
        const percent = Math.max(0, 100 - (timerElapsed / combatDuration) * 100);
        const bar = container.querySelector('.combat-timer-bar-fg');
        if (bar) {
            bar.style.width = percent + "%";
        }
        if (timerElapsed >= combatDuration) {
            clearInterval(timerInterval);
            resolveCombat(enemy, container);
        }
    }, 50);
}

function resolveCombat(enemy, container) {
    let playerHp = game.player.health;
    let enemyHp = enemy.maxHp;

    // Combat simulé en un seul "round"
    while (playerHp > 0 && enemyHp > 0) {
        // Joueur attaque
        let playerDmg = Math.max(1, 5 + (game.player.level - enemy.defense));
        enemyHp -= playerDmg;

        // Ennemi attaque si vivant
        if (enemyHp > 0) {
            let enemyDmg = Math.max(1, enemy.attack - 1);
            playerHp -= enemyDmg;
        }
    }

    let result = '';
    if (playerHp > 0 && enemyHp <= 0) {
        result = `<b>Victory!</b> You defeated the ${enemy.name}.<br>
                  <span style="color:#ffd447;">+${enemy.exp} XP</span> &nbsp; <span style="color:#ffe066;">+1 Gold</span>`;
        game.player.exp += enemy.exp;
        game.player.gold += 1;
        document.dispatchEvent(new CustomEvent('missionProgress', {
            detail: { missionName: "First Steps in the Forest.", progress: 1 }
        }));
    } else if (playerHp <= 0) {
        result = `<b>Defeat!</b> The ${enemy.name} was too strong.`;
    }
    game.player.health = Math.max(0, playerHp);

    displayCombatResult(`
        <div id="combat-log">${result}</div>
    `, container);
}

function displayCombatResult(html, container) {
    container.innerHTML = html;
}