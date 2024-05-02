var SpellSlots = 2; // Siirrä alustus silmukan ulkopuolelle

for (var i = 3; i >= 0; i--) {
    if (SpellSlots > 0) {
        console.log("Casting spell")
        SpellSlots -= 1
    }
    else {
        console.log("Not enough spell slots to cast spell")
    }
}
