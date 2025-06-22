import { game } from './main.js';

export function startCombat(enemyId, container, btn) {
    const enemy = game.enemies.find(e => e.id === enemyId);
    if (!enemy) {
        displayCombatResult("Enemy not found!", container, {});
        if (btn) btn.disabled = false;
        return;
    }

    displayCombatResult(`
        <div id="combat-log">Preparing to fight ${enemy.name}...</div>
        <div class="combat-timer-bar">
            <div class="combat-timer-bar-bg">
                <div class="combat-timer-bar-fg" style="width:100%"></div>
            </div>
        </div>
    `, container, { enemy });

    const combatDuration = 5000;
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
            resolveCombat(enemy, container, btn);
        }
    }, 50);
}

function resolveCombat(enemy, container, btn) {
    let playerHp = game.player.health;
    let enemyHp = enemy.maxHp;

    while (playerHp > 0 && enemyHp > 0) {
        let playerDmg = Math.max(1, 5 + (game.player.level - enemy.defense));
        enemyHp -= playerDmg;
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

    const resultCell = container.querySelector('.combat-result');
    if (resultCell) {
        resultCell.innerHTML = `<div id="combat-log">${result}</div>`;
    }
    if (btn) {
        btn.disabled = false;
        btn.classList.remove('area-disabled-btn');
    } // Réactive le bouton
}

function displayCombatResult(resultHtml, container, options = {}) {
    // options peut contenir : enemy, player, etc.
    let grid = `
        <div class="combat-grid">
            <div class="combat-cell combat-enemy">
                <div class="combat-label">Enemy</div>
                <div class="combat-value">${options.enemy ? options.enemy.name : ''}</div>
            </div>
            <div class="combat-cell combat-vs">
                <span>VS</span>
            </div>
            <div class="combat-cell combat-player">
                <div class="combat-label">Player</div>
                <div class="combat-value">You</div>
            </div>
            <div class="combat-cell combat-result" colspan="3">
                ${resultHtml || ""}
            </div>
        </div>
    `;
    container.innerHTML = grid;
}