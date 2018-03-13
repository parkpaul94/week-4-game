var fighter = [];
var selectedfighter = false;
var defender = [];
var selecteddefender = false;
var fightwon = 0;
var gameover = false;

var darth   = {
                name: "Darth Vader",
                health: 500,
                baseAttack: 20,
                damage: 20
                },
    boba    = {
                name: "Boba Fett",
                health: 300,
                baseAttack: 8,
                damage: 8
    },
    yoda    = {
                name: "Yoda",
                health: 400,
                baseAttack: 15,
                damage: 15
    },
    luke    = {
                name: "Luke Skywalker",
                health: 250,
                baseAttack: 10,
                damage: 10
    };

function setCharacters (cfighter) {
  fighter.name          = cfighter.name;
  fighter.health        = cfighter.health;
  fighter.baseAttack    = cfighter.baseAttack;
  fighter.attack        = cfighter.attack;
}

function setDefender (cdefender) {
    defender.name       = cdefender.name;
    defender.health     = cdefender.health;
    defender.baseAttack = cdefender.baseAttack;
    defender.attack     = cdefender.attack;
}

function removeCharacter () {
    $(".available").removeClass("available").addClass("unavailable");
}
