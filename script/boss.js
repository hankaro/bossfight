var bossSpellSlots = 2;
var heroSpellSlots = 2;
var bossHP = 50;
var heroHP = 50;

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


function CastSpell() {
    if (heroSpellSlots > 0) {
        console.log("Casting spell")
        var hits = hitDice()
        if (hits) {
            var dmg = dmgDiceSpell()
            console.log("Spell hit for " + dmg + " damage")
            bossHP -= dmg
            console.log("Boss HP: " + bossHP)
        }
        else {
            console.log("Spell missed")
        }
        heroSpellSlots -= 1
    }
    else {
        console.log("Not enough spell slots to cast spell")
    }
}

function mainFight() {
    while (bossHP > 0 && heroHP > 0) {
        //liiba
    }
}

while (heroSpellSlots > 0) {
    CastSpell ()
    console.log("Boss HP: " + bossHP)
    console.log("Spellslots: " + heroSpellSlots)
}
