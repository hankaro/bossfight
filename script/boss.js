// tulevaisuudessa: buff, shield, heal

var hero = {
    spellSlots: 2,
    hp: 40
}

var boss = {
    spellSlots: 2,
    hp: 40
}

function hitDice() {
    var roll = Math.ceil(Math.random() * 20)
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


var startView = document.querySelector('#beginning');
var turnDisplay = document.querySelector('#turnDisplay');

var alert = document.querySelector('#turnAlert');
var alertHeading = alert.querySelector('#turnHeading');
var alertText = alert.querySelector('#turnText');

var turn = "hero"

const castSpellButton = document.getElementById('castSpellButton');
const useWeaponButton = document.getElementById('useWeaponButton');

//const startButton = document.getElementById('startButton');
// startButton.addEventListener('click', function() {
//    heroAttack()
// })


function changeTurn() {
    if (turn === "hero") {
        alert.classList.remove('alert-primary');
        alert.classList.add('alert-danger');
        alertHeading.textContent = "Boss attack:"
        alertText.textContent = "..."
    }
    else {
        alert.classList.remove('alert-danger');
        alert.classList.add('alert-primary');
        alertHeading.textContent = "Your Turn!"
        alertText.textContent = "..."
    }
}


function bossAttack() {
    turn = "boss"
    if (boss.spellSlots > 0) {
        var desicion = Math.random()
        if (desicion > 0.5) {
            var spellHits = hitDice()
            if (spellHits){
                var spellDmg = dmgDiceSpell()
                console.log("Boss spell hit for " + spellDmg + " damage")
                alertText.textContent = "Boss spell hit for " + spellDmg + " damage"
                hero.hp -= spellDmg
            }
            else {
                console.log("Boss attack missed")
                alertText.textContent = "Boss attack missed"
            }
        }
        else {
            var meleeHits = hitDice()
            if (meleeHits) {
                var meleeDmg = dmgDiceMelee()
                console.log("Boss attack hit for " + meleeDmg + " damage")
                alertText.textContent = "Boss attack hit for " + meleeDmg + " damage"
                hero.hp -= meleeDmg
            }
            else {
                console.log("Boss attack missed")
                alertText.textContent = "Boss attack missed"
            }
        }
    }
    updateHeroHp()
    var proceedGame = checkWinLoss()
    setTimeout(() => {
        if (proceedGame) {
            changeTurn()
        }
        else {
            gameOver()
        }
      }, "3000");
      
   

}


function castSpell() {
    if (hero.spellSlots > 0) {
        console.log("Casting spell")
        var hits = hitDice()
        if (hits) {
            var dmg = dmgDiceSpell()
            console.log("Spell hit for " + dmg + " damage")
            boss.hp -= dmg
            console.log("Boss HP: " + boss.hp + "/40")
        }
        else {
            console.log("Spell missed")
        }
        hero.spellSlots -= 1
    }
    else {
        console.log("Not enough spell slots to cast spell")
    }
}

function useWeapon() {
    var hits = hitDice()
    if (hits) {
        var dmg = dmgDiceMelee()
        console.log("Melee hit for " + dmg + " damage")
        boss.hp -= dmg
        console.log("Boss HP: " + boss.hp + "/40")
    }
    else {
        console.log("You miss!")
    }
}

function updateBossHp() {
    var bar = document.querySelector('#bossBar');
    var hpText = bar.querySelector('span');
    var hpPercent = Math.floor(boss.hp / 40 * 100)
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
    var bar = document.querySelector('#heroBar');
    var hpText = bar.querySelector('span');
    var hpPercent = Math.floor(hero.hp / 40 * 100)
    if (hero.hp < 0) {
        hpPercent = 0
        hero.hp = 0
    }
    bar.style.width = hpPercent + "%";
    hpText.textContent = hero.hp + " HP";
    if (hpPercent <= 50) {
        bar.classList.remove('bg-success');
        bar.classList.add('bg-warning');
    }
    if (hpPercent <= 25) {
        bar.classList.remove('bg-warning');
        bar.classList.add('bg-danger');
    }

}

function gameOver() {
    alert.classList.remove('alert-primary');
    alert.classList.remove('alert-danger');
    if (hero.hp <= 0) {
        alert.classList.add('alert-danger');
        alertHeading.textContent = "Game over!"
        alertText.textContent = "You lost!"
    }
    if (boss.hp <= 0) {
        alert.classList.add('alert-success');
        alertHeading.textContent = "Game over!"
        alertText.textContent = "You won!"
    }

    }

function checkWinLoss() {
    var gameStatus = true
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
    castSpell();
    updateBossHp();
    var proceedGame = checkWinLoss();
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
    useWeapon();
    updateBossHp();
    var proceedGame = checkWinLoss()
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

var music = document.getElementById("music");
    var pauseButton = document.getElementById("pauseButton");

    pauseButton.addEventListener("click", function() {
        if (music.paused) {
            music.play();
            pauseButton.innerHTML = "<i class='fa fa-pause'></i>";
        } else {
            music.pause();
            pauseButton.innerHTML = "<i class='fa fa-play'></i>";
        }
    });






    /* Game test
var round = 1

while (boss.hp > 0 && hero.hp > 0) {
    console.log("Round " + round)

    
    if (hero.spellSlots > 0) {
        castSpell()
        console.log("Spellslots: " + hero.spellSlots)
    }
    else {
        useWeapon()
    }
    console.log("Boss hp: " + boss.hp)
    updateBossHp()
    console.log("")

    console.log("Boss attack:")
    bossAttack()
    console.log("Hero hp: " + hero.hp)
    round += 1
    console.log("------------------")
    checkWinLoss()
}

*/

/*

COUNTERSPELL KAMAT 

var counterspell = alert.querySelector('#csButtons');
const counterSpellButton = document.getElementById('counterspell');
const counterSpellCancelButton = document.getElementById('counterspellCancel');

if (hero.spellSlots > 0) {
    alertText.textContent = "Boss is going to cast a spell. Do you want to use counterspell? (Costs 1 spell slot)"
    counterspell.classList.remove('counterspell-hide')
    counterSpellButton.addEventListener('click', function() {
        alertText.textContent = "Used counterspell!"
        counterspell.classList.add('counterspell-hide')
    })
    counterSpellCancelButton.addEventListener('click', function() {
        counterspell.classList.add('counterspell-hide')
        console.log("Boss spell hit for " + spellDmg + " damage")
        alertText.textContent = "Boss spell hit for " + spellDmg + " damage"
        hero.hp -= spellDmg
    })
}
else {
    var spellDmg = dmgDiceSpell()
    console.log("Boss spell hit for " + spellDmg + " damage")
    alertText.textContent = "Boss spell hit for " + spellDmg + " damage"
    hero.hp -= spellDmg
}
*/