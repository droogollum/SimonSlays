// Variables

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userPattern = [];

var level = 0;

var gameStart = false;

// Start Function

$(document).keypress(function() {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

// Other Functions

function playSound(color) {
  var userSound = new Audio("sounds/" + color + ".mp3");
  userSound.play();
  var bassDrum = new Audio("sounds/kick-bass.mp3");
  bassDrum.play();
}

$(".btn").click(function() {
  var userColor = $(this).attr("id");
  $(this).fadeIn(100).fadeOut(100).fadeIn(100);
  userPattern.push(userColor);
  playSound(userColor);
  checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {nextSequence();}, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart")
    setTimeout(function() {$("body").removeClass("game-over");}, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}

// Sequence Function

function nextSequence() {

  userPattern = [];

  level++

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomColor = buttonColors[randomNumber];

  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColor);
}
