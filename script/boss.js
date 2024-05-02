var SpellSlots = 2; // Siirrä alustus silmukan ulkopuolelle
var bossHP = 50
var heroHP = 50


function CastSpell() {
    if (SpellSlots > 0) {
        console.log("Casting spell")
        SpellSlots -= 1
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

