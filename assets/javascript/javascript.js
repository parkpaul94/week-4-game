var fighter = [];
var selectedfighter = false;
var defender = [];
var selecteddefender = false;
var fightwon = 0;
var gameover = false;

var darth   = {
                name: "Darth Vader",
                maxhp: 500,
                hp: 500,
                baseAttack: 20,
                damage: 20,
                heal: 5
};

var boba    = {
                name: "Boba Fett",
                maxhp: 300,
                hp: 300,
                baseAttack: 12,
                damage: 12,
                heal: 2
};

var yoda    = {
                name: "Yoda",
                maxhp: 400,
                hp: 400,
                baseAttack: 15,
                damage: 15,
                heal: 15
};

var luke    = {
                name: "Luke Skywalker",
                maxhp: 250,
                hp: 250,
                baseAttack: 10,
                damage: 10,
                heal: 7
};

function setCharacters (cfighter) {
    fighter.heal          = cfighter.heal;
    fighter.name          = cfighter.name;
    fighter.hp            = cfighter.hp;
    fighter.baseAttack    = cfighter.baseAttack;
    fighter.damage        = cfighter.damage;
}

function setDefender (cdefender) {
    defender.name           = cdefender.name;
    defender.hp             = cdefender.hp;
    defender.baseAttack     = cdefender.baseAttack;
    defender.damage         = cdefender.damage;
}

function removeCharacter () {
    $(".available").removeClass("available").addClass("unavailable");
}

function replay() {
    $("#attack").show();
    $("#dv").children(".hp").html(darth.hp);
    $("#bf").children(".hp").html(boba.hp);
    $("#yd").children(".hp").html(yoda.hp);
    $("#ls").children(".hp").html(luke.hp);
    $(".character").removeClass("fighter unavailable defender").addClass("available");  // REMOVE BACKGROUND COLOR CHANGE AND ENABLE CHARACTERS TO BE VISIBLE AND AVAILABLE AGAIN
    var available = $(".available").show();
    $(".character-list").html(available);
    $("#infobox").empty();
    $("#replay").hide();
    selectedfighter = false;
    selecteddefender = false;
    fightwon = 0;
    gameover = false;
    fighter = [];
    defender = [];
  };

$(document).ready(function() {
    $("#replay").hide();

$("#dv").click(function () {
    if(selectedfighter == false) {
        $("#infobox").empty();
        setCharacters(darth);
        selectedfighter = true;
        $("#dv").removeClass("available").addClass("fighter");
        $("#fighter").append(this);
        removeCharacter();
    } 
    
    else if ((selectedfighter == true) && (selecteddefender == false)) {
        if($("#dv").hasClass("unavailable")) {
          $("#infobox").empty();
          setDefender(darth);
          selecteddefender = true;
          $("#dv").removeClass("unavailable").addClass("defender");
          $("#defender").append(this);
        }
      }
    });

$("#bf").click(function () {
      if(selectedfighter == false) {
        $("#infobox").empty();
        setCharacters(boba);
        selectedfighter = true;
        $("#bf").removeClass("available").addClass("fighter");
        $("#fighter").append(this);
        removeCharacter();
    } 
    
    else if ((selectedfighter == true) && (selecteddefender == false)) {
        if($("#bf").hasClass("unavailable")) {
          $("#infobox").empty();
          setDefender(boba);
          selecteddefender = true;
          $("#bf").removeClass("unavailable").addClass("defender");
          $("#defender").append(this);
        }
      }
    });

$("#yd").click(function () {
      if(selectedfighter == false) {
        $("#infobox").empty();
        setCharacters(yoda);
        selectedfighter = true;
        $("#yd").removeClass("available").addClass("fighter");
        $("#fighter").append(this);
        removeCharacter();
    } 
    
    else if ((selectedfighter == true) && (selecteddefender == false)) {
        if($("#yd").hasClass("unavailable")) {
          $("#infobox").empty();
          setDefender(yoda);
          selecteddefender = true;
          $("#yd").removeClass("unavailable").addClass("defender");
          $("#defender").append(this);
        }
      }
    });

$("#ls").click(function () {
      if(selectedfighter == false) {
        $("#infobox").empty();
        setCharacters(luke);
        selectedfighter = true;
        $("#ls").removeClass("available").addClass("fighter");
        $("#fighter").append(this);
        removeCharacter();
    } 
    
    else if ((selectedfighter == true) && (selecteddefender == false)) {
        if($("#ls").hasClass("unavailable")) {
          $("#infobox").empty();
          setDefender(luke);
          selecteddefender = true;
          $("#ls").removeClass("unavailable").addClass("defender");
          $("#defender").append(this);
        }
      }
    });

$("#attack").click(function() {
    if (selectedfighter && selecteddefender && !gameover) {
        defender.hp = defender.hp - fighter.damage;
        $(".defender").children(".hp").html(defender.hp);
        $("#infobox").html("<p>" + fighter.name + " attacked " + defender.name + " for " + fighter.damage + " damage!");
        fighter.damage = fighter.damage + fighter.baseAttack;
        defender.damage = defender.damage + defender.baseAttack;
        if (defender.hp > 0) {
            fighter.hp = fighter.hp - defender.damage + fighter.heal;
            // fighter.maxhp = fighter.hp + fighter.heal;
        $(".fighter").children(".hp").html(fighter.hp);
        if (fighter.hp > 0) {
            $("#infobox").append("<p><p>" + defender.name + " dealt " + defender.damage + " damage to " + fighter.name + "!<p>");
            $("#infobox").append("<p><p>" + fighter.name + " healed " + fighter.heal + " hp!<p>");

        } 
        else {
            gameover = true;
            $("#infobox").html("You died! Try Again?");
            $("#restart").show();
            $("#attack").hide();
        }
        
        } 
        else {
        fightwon++;
        selecteddefender = false;
        $("#infobox").html("You've defeated " + defender.name + "!");
        $(".defender").hide();
        if (fightwon === 3) {
            gameover = true;
            $("#infobox").html("Congratulations! You are the Champion!");
            $("#replay").show();
            $("#attack").hide();
        }
        }
    } 
    else if (!selectedfighter && !gameover) {
        $("#infobox").html("Please select your Character!");
    } 
    else if (!selecteddefender && !gameover) {
        $("#infobox").html("You must select an enemy to battle!");
    }
});

    $("#replay").on("click", function() {
    replay();
    });

}); 