
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//detect key press
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

//check which button is pressed

//Use jQuery to select the button with the same id as the randomChosenColour
$(".btn").click(function() { // jQuery has a .click() function:
  var userChosenColour = $(this).attr("id");//select current button -> attribute: id
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function checkAnswer(currentLevel) {
  // var lastIdx = userClickedPattern.length - 1;
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //if got the most recent answer right
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() { nextSequence(); }, 1000);
    }
  }
  else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function nextSequence() {
  userClickedPattern = []; //reset goes here, when nextSequence() is triggered
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //flashing, inside the nextSequence function
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) { //takes single input
  var audio = new Audio("sounds/" + name + ".mp3"); //play sound
  audio.play(); //remember this line
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

  // $("#" + currentColor).click(function() {
  //   ("#" + currentColor).addClass(".pressed").delay(100).removeClass("pressed");
  // })

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
