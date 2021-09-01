
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// detect click events and store it a variable
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // when the length of arrays are the same, check the answer
  if (gamePattern.length === userClickedPattern.length) {
  checkAnswer();
  }
});

// when each index in each array are the same, check the lengths
function checkAnswer(currentLevel) {
  for (var currentLevel = 0; currentLevel < gamePattern.length; currentLevel++) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (gamePattern[gamePattern.length] === userClickedPattern[userClickedPattern.length]) {
        setTimeout(nextSequence(), 5000);
        userClickedPattern = [];
        break;
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }
}

// to start the game, press a button. Then deactivate keypress
var startedGame = $(document).keypress(function(){
  if (!started) {
  nextSequence();
  started = true;
  }
});

// get the random number and match it with array's index
function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

// reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// play the sounds according to the buttons and situation
function playSound(name) {
  var playAudio = new Audio("sounds/"+name+".mp3");
  playAudio.play();
}

// add and remove class to make an visual effect
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}
