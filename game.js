
const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// detect click events and store it a variable
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // When the length of both arrays are the same, check the answer
  if (userClickedPattern.length === gamePattern.length) {
  checkAnswer();
  }
});

function checkAnswer() {
  for (let currentLevel = 0; currentLevel < gamePattern.length; currentLevel++) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (currentLevel == gamePattern.length-1) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 200);
      
      startOver();
    }
  }
}

// to start the game, press a button. Then deactivate keypress
const startedGame = $(document).keypress(function(){
  if (!started) {
  nextSequence();
  started = true;
  }
});

// get the random number and match it with array's index
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

    const sleep = (time) => {
        return new Promise(resolve => setTimeout(resolve, time))
    }

    const showCompletePattern = async() => {
        for (let index = 0; index < gamePattern.length; index++) {
            $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[index])
            await sleep(500)
        }
    }

    showCompletePattern()

}

// reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// play the sounds according to the buttons and situation
function playSound(name) {
  let playAudio = new Audio("sounds/"+name+".mp3");
  playAudio.play();
}

// add and remove class to make an visual effect
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}
