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

function bossAttack() {
    if (boss.spellSlots > 0) {
        var desicion = Math.random()
        if (desicion > 0.5) {
            var spellHits = hitDice()
            if (spellHits){
                //if (hero.spellSlots > 0) {
                //    console.log("Boss is casting a spell. Want to cast a Counterspell (costs 1 spell slot)?")
                //}
                var spellDmg = dmgDiceSpell()
                console.log("Boss spell hit for " + spellDmg + " damage")
                hero.hp -= spellDmg
            }
        }
        else {
            var meleeHits = hitDice()
            if (meleeHits) {
                var meleeDmg = dmgDiceMelee()
                console.log("Boss attack hit for " + meleeDmg + " damage")
                hero.hp -= meleeDmg
            }
        }
    }
}


function castSpell() {
    if (hero.spellSlots > 0) {
        console.log("Casting spell")
        var hits = hitDice()
        if (hits) {
            var dmg = dmgDiceSpell()
            console.log("Spell hit for " + dmg + " damage")
            boss.hp -= dmg
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
    }
    else {
        console.log("You miss!")
    }
}

function mainFight() {
    while (boss.hp > 0 && hero.hp > 0) {
        //liiba
    }
}

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
    console.log("")

    console.log("Boss attack:")
    bossAttack()
    console.log("Hero hp: " + hero.hp)
    round += 1
    console.log("------------------")
}

if (hero.hp > boss.hp) {
    console.log("You won!")
}
else {
    console.log("You lost!")
}
