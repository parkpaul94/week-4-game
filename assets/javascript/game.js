// ----- Global Variables ----- //

// Has the user selected their character
var characterSelected = false;

// Has the user selected the defender
var defenderSelected = false;

// Variable to store the user's chosen character
var character = [];

// Variable to store the chosen enemy
var defender = [];

// Number of enemies defeated
var enemiesDefeated = 0;

// Boolean to indicate whether or not the game is over
var gameOver = false;

// ----- Character Objects ----- //

var darth = {
  name: "Obi-Wan Kenobi",
  health: 120,
  baseAttack: 8,
  attack: 8
},

boba = {
  name: "Luke Skywalker",
  health: 100,
  baseAttack: 5,
  attack: 5
};

var yoda = {
  name: "Darth Sidious",
  health: 150,
  baseAttack: 20,
  attack: 20
};

var luke = {
  name: "Darth Maul",
  health: 180,
  baseAttack: 25,
  attack: 25
};

// ----- Helper Functions ----- //

// This function will initialize the character value from the global object variables defined above
function initializeCharacter(chosenCharacter) {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.baseAttack = chosenCharacter.baseAttack;
  character.attack = chosenCharacter.attack;
}

// This function will initialize the enemy's value from the global object variables defined above
function initializeDefender(chosenDefender) {
  defender.name = chosenDefender.name;
  defender.health = chosenDefender.health;
  defender.baseAttack = chosenDefender.baseAttack;
  defender.attack = chosenDefender.attack;
}

// This function will move the remaining characters to the enemies section
function moveToEnemies() {
  $(".available").removeClass("available").addClass("unavailable");
  // $("#enemies-available").append($(".unavailable"));
}

// This function will reset the state of the game
function resetGame() {
  // Reset all the health values to the original
  $("#dv").children(".hp").html(darth.health);
  $("#bf").children(".hp").html(boba.health);
  $("#yd").children(".hp").html(yoda.health);
  $("#ls").children(".hp").html(luke.health);

  $(".character-image").removeClass("fighter unavailable defender").addClass("available");
  var available = $(".available").show();
  $("#characters-available").html(available);

  $("#infobox").empty();
  $("#replay").hide();

  characterSelected = false;
  defenderSelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  defender = {};
}

// ----- Main Routine ----- //

// Run Javascript when the HTML has finished loading
$(document).ready(function() {

  // Hide the "replay" button on document load
  $("#replay").hide();

  // Determine which character the user has clicked
  $("#dv").on("click", function () {
    console.log("Obi-Wan Kenobi is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#infobox").empty();

      // Set the user's character
      initializeCharacter(darth);
      characterSelected = true;

      // Display the chosen character
      $("#dv").removeClass("available").addClass("fighter");
      $("#fighter").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      // User is choosing the defender
      if($("#dv").hasClass("unavailable")) {
        $("#infobox").empty();

        // Set the user's enemy
        initializeDefender(darth);
        defenderSelected = true;

        // Add the character to the defender section
        $("#dv").removeClass("unavailable").addClass("defender");
        $("#defender").append(this);
      }
    }
  });

  $("#bf").on("click", function () {
    console.log("Luke Skywalker is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#infobox").empty();

      // Set the user's character
      initializeCharacter(boba);
      characterSelected = true;

      // Display the chosen character
      $("#bf").removeClass("available").addClass("fighter");
      $("#fighter").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      // User is choosing the defender
      if($("#bf").hasClass("unavailable")) {
        $("#infobox").empty();

        // Set the user's enemy
        initializeDefender(boba);
        defenderSelected = true;

        // Add the character to the defender section 
        $("#bf").removeClass("unavailable").addClass("defender");
        $("#defender").append(this);
      }
    }
  });

  $("#yd").on("click", function () {
    console.log("Darth Sidious is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#infobox").empty();

      // Set the user's character
      initializeCharacter(yoda);
      characterSelected = true;

      // Display the chosen character
      $("#yd").removeClass("available").addClass("fighter");
      $("#fighter").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      // User is choosing the defender
      if($("#yd").hasClass("unavailable")) {
        $("#infobox").empty();

        // Set the user's enemy
        initializeDefender(yoda);
        defenderSelected = true;

        // Add the character to the defender section 
        $("#yd").removeClass("unavailable").addClass("defender");
        $("#defender").append(this);
      }
    }
  });

  $("#ls").on("click", function () {
    console.log("Darth Maul is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#infobox").empty();

      // Set the user's character
      initializeCharacter(luke);
      characterSelected = true;

      // Display the chosen character
      $("#ls").removeClass("available").addClass("fighter");
      $("#fighter").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      // User is choosing the defender
      if($("#ls").hasClass("unavailable")) {
        $("#infobox").empty();

        // Set the user's enemy
        initializeDefender(luke);
        defenderSelected = true;

        // Add the character to the defender section 
        $("#ls").removeClass("unavailable").addClass("defender");
        $("#defender").append(this);
      }
    }
  });

  $("#attack").on("click", function() {
    if (characterSelected && defenderSelected && !gameOver) {
      defender.health = defender.health - character.attack;
      $(".defender").children(".hp").html(defender.health);
      $("#infobox").html(character.name + " dealt " + character.attack + " damage to " + defender.name + "<p>");
      character.attack = character.attack + character.baseAttack;
      if (defender.health > 0) {
        character.health = character.health - defender.baseAttack;
        $(".fighter").children(".hp").html(character.health);
        if (character.health > 0) {
          $("#infobox").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#infobox").html("<p>You were defeated... womp womp...</p><p>Play again?</p>");
          $("#replay").show();
        }
      } else {
        enemiesDefeated++;
        defenderSelected = false;
        $("#infobox").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
        $(".defender").hide();
        if (enemiesDefeated === 3) {
          gameOver = true;
          $("#infobox").html("<p>You have won the game!!!</p><p>Play again?</p>");
          $("#replay").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#infobox").html("<p>You must first select your game character.</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#infobox").html("<p>You must choose an enemy to fight.</p>");
    }
  });

  $("#replay").on("click", function() {
    resetGame();
  });

}); // Main routine
