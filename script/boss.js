// tulevaisuudessa: buff, shield, heal

//TODO: SPellslot counter, Retry button on gameover

let hero = {
    spellSlots: 2,
    hp: 40
}

let boss = {
    spellSlots: 2,
    hp: 40
}

function hitDice() {
    let roll = Math.ceil(Math.random() * 20)
    if (roll >= 10) {
        return true
    }
    else {
        return false
    }
    
}

function dmgDiceMelee() {
    return Math.ceil(Math.random() * 8)
}

function dmgDiceSpell() {
    return Math.ceil(Math.random() * 16)
}


//var startView = document.querySelector('#beginning');
//var turnDisplay = document.querySelector('#turnDisplay');

const turnAlert = document.querySelector('#turnAlert');
const alertHeading = turnAlert.querySelector('#turnHeading');
const alertText = turnAlert.querySelector('#turnText');

let turn = ""

const actionsDiv = document.getElementById('actions');
//const counterSpellDiv = document.getElementById('csButtons');
const castSpellButton = document.getElementById('castSpellButton');
const useWeaponButton = document.getElementById('useWeaponButton');
const heroSpellSlots = document.getElementById('heroSpellSlots');
const bossSpellSlots = document.getElementById('bossSpellSlots');

const tryAgainDiv = document.getElementById('tryAgain');
const tryAgainButton = document.getElementById('tryAgainButton');
// const countersSpellButton = document.getElementById('counterspell');
// const counterSpellCancelButton = document.getElementById('counterspellCancel');


function changeTurn() {
    if (turn === "hero") {
        turnAlert.classList.remove('alert-primary');
        turnAlert.classList.add('alert-danger');
        alertHeading.textContent = "Boss attack:";
        alertText.textContent = "...";
        actionsDiv.classList.add('display-none');
    }
    else if (turn === "boss") {
        turnAlert.classList.remove('alert-danger');
        turnAlert.classList.add('alert-primary');
        alertHeading.textContent = "Your Turn!";
        alertText.textContent = "...";
        actionsDiv.classList.remove('display-none');
        if (hero.spellSlots > 0) {
            castSpellButton.classList.remove('disabled');
            useWeaponButton.classList.remove('disabled');
        }
        else {
            useWeaponButton.classList.remove('disabled');
            castSpellButton.classList.remove('btn-primary');
            castSpellButton.classList.add('btn-outline-primary');
            castSpellButton.textContent = "No spell slots";
        }
    }
}


function bossAttack() {
    turn = "boss"
    console.log("Boss attack")
    if (boss.spellSlots > 0) {
        let desicion = Math.random()
        if (desicion > 0.5) {
            bossSpellAttack()
        }
        else {
            bossMeleeAttack()
            }
        }
    else {
        bossMeleeAttack()   
    }
    updateHeroHp()
    let proceedGame = checkWinLoss()
    setTimeout(() => {
        if (proceedGame) {
            changeTurn()
        }
        else {
            gameOver()
        }
      }, "3000");
}
    


function bossSpellAttack() {
    let spellHits = hitDice();
    if (spellHits) {
        let spellDmg = dmgDiceSpell();
        console.log("Boss spell hit for " + spellDmg + " damage");
        alertHeading.textContent = "Boss attacks you with a spell!";
        alertText.textContent = "Boss spell hit for " + spellDmg + " damage";
        hero.hp -= spellDmg;
        boss.spellSlots -= 1;
        bossSpellSlots.textContent = "Spell slots: " + boss.spellSlots;
        console.log("Boss spell slots: " + boss.spellSlots);
    } else {
        console.log("Boss attack missed");
        alertHeading.textContent = "Boss tried to hit you with a spell.";
        alertText.textContent = "Boss attack missed";
        boss.spellSlots -= 1;
        bossSpellSlots.textContent = "Spell slots: " + boss.spellSlots;
        console.log("Boss spell slots: " + boss.spellSlots);
    }
}


function bossMeleeAttack() {
    let meleeHits = hitDice()
    if (meleeHits) {
        let meleeDmg = dmgDiceMelee()
        console.log("Boss attack hit for " + meleeDmg + " damage")
        alertHeading.textContent = "Boss attacks you with its sword!"
        alertText.textContent = "Boss attack hit for " + meleeDmg + " damage"
        hero.hp -= meleeDmg
    }
    else {
        console.log("Boss attack missed")
        alertHeading.textContent = "Boss tried to hit you with its sword!"
        alertText.textContent = "Boss attack missed"
}
}


function castSpell() {
    if (hero.spellSlots > 0) {
        console.log("Casting spell")
        let hits = hitDice()
        if (hits) {
            let dmg = dmgDiceSpell()
            console.log("Spell hit for " + dmg + " damage")
            boss.hp -= dmg
            console.log("Boss HP: " + boss.hp + "/40")
            alertHeading.textContent = "You casted Fireball!"
            alertText.textContent = "Spell hit for " + dmg + " damage"
        }
        else {
            console.log("Spell missed")
            alertHeading.textContent = "You casted Fireball!"
            alertText.textContent = "Spell missed"
        }
        hero.spellSlots -= 1
        heroSpellSlots.textContent = "Spell slots: " + hero.spellSlots
    }
    else {
        console.log("Not enough spell slots to cast spell")
    }
}

function useWeapon() {
    let hits = hitDice()
    if (hits) {
        let dmg = dmgDiceMelee()
        console.log("Melee hit for " + dmg + " damage")
        boss.hp -= dmg
        console.log("Boss HP: " + boss.hp + "/40")
        alertHeading.textContent = "You hit the boss with your sword!"
        alertText.textContent = "Melee hit for " + dmg + " damage"
    }
    else {
        console.log("You miss!")
        alertHeading.textContent = "You tried to hit the boss with your sword."
        alertText.textContent = "You miss!"
    }
}

function updateBossHp() {
    let bar = document.querySelector('#bossBar');
    let hpText = bar.querySelector('span');
    let hpPercent = Math.floor(boss.hp / 40 * 100)
    if (boss.hp < 0) {
        hpPercent = 0
        boss.hp = 0
    }
    bar.style.width = hpPercent + "%";
    hpText.textContent = boss.hp + " HP";
    if (hpPercent <= 50) {
        bar.classList.remove('bg-success');
        bar.classList.add('bg-warning');
    }
    if (hpPercent <= 25) {
        bar.classList.remove('bg-warning');
        bar.classList.add('bg-danger');
    }

}

function updateHeroHp() {
    let herobar = document.querySelector('#heroBar');
    let hpText = herobar.querySelector('span');
    let hpPercent = Math.floor(hero.hp / 40 * 100)
    if (hero.hp < 0) {
        hpPercent = 0
        hero.hp = 0
    }
    herobar.style.width = hpPercent + "%";
    hpText.textContent = hero.hp + " HP";
    if (hpPercent <= 50) {
        console.log("hpPercent below 50")
        herobar.classList.remove('bg-success');
        herobar.classList.add('bg-warning');
    }
    if (hpPercent <= 25) {
        herobar.classList.remove('bg-warning');
        herobar.classList.add('bg-danger');
    }

}

function gameOver() {
    actionsDiv.classList.add('display-none');
    turnAlert.classList.remove('alert-primary');
    turnAlert.classList.remove('alert-danger');
    tryAgainDiv.classList.remove('display-none');
    tryAgainButton.addEventListener('click', tryaAgain);
    if (hero.hp <= 0) {
        turnAlert.classList.add('alert-dark');
        alertHeading.textContent = "Game over!"
        alertText.textContent = "You lost!"
    }
    if (boss.hp <= 0) {
        turnAlert.classList.add('alert-success');
        alertHeading.textContent = "Game over!"
        alertText.textContent = "You won!"
    }

    }

function checkWinLoss() {
    let gameStatus = true
    if (hero.hp <= 0) {
        gameStatus = false
        console.log("You lost!");
    } else if (boss.hp <= 0) {
        console.log("You won!");
        gameStatus = false
    }
    else {
        gameStatus = true
        return gameStatus
    }
}
    




// HERO CLICKS

castSpellButton.addEventListener('click', function() {
    turn = "hero"
    castSpellButton.classList.add('disabled');
    useWeaponButton.classList.add('disabled');
    castSpell();
    updateBossHp();
    let proceedGame = checkWinLoss();
    setTimeout(() => {
        if (proceedGame) {
            changeTurn()
            bossAttack()
        }
        else {
            gameOver()
        }
    }, "3000");
});

useWeaponButton.addEventListener('click', function() {
    turn = "hero"
    castSpellButton.classList.add('disabled');
    useWeaponButton.classList.add('disabled');
    useWeapon();
    updateBossHp();
    let proceedGame = checkWinLoss()
    setTimeout(() => {
        if (proceedGame) {
            changeTurn()
            bossAttack()
        }
        else {
            gameOver()
        }
    }, "3000");
});


// AUDIO PLAYER

let music = document.getElementById("music");
    let pauseButton = document.getElementById("pauseButton");

    pauseButton.addEventListener("click", function() {
        if (music.paused) {
            music.play();
            pauseButton.innerHTML = "<i class='fa fa-pause'></i>";
        } else {
            music.pause();
            pauseButton.innerHTML = "<i class='fa fa-play'></i>";
        }
    });

function tryaAgain() {
    location.reload();
}