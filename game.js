var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function() {

  if (started == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});




// To make sound when the user clicks on the button
$(".btn").click(function handler(event) {

  var userChosenColour = event.target.id;

  userClickedPattern.push(userChosenColour);

  $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);



  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColour);

}

// Playing Sound.
function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Pressing animation when you click the button.
function animatePress(currentColour) {

  $(".row ." + currentColour).addClass("pressed");

  setTimeout(function() {
    $(".row ." + currentColour).removeClass("pressed");
  }, 100);

}

// Checking Answers

function checkAnswer(currentLevel){

if( userClickedPattern[currentLevel] === gamePattern[currentLevel] ){

console.log("success");

  if(userClickedPattern.length === gamePattern.length){

    setTimeout(function(){
      nextSequence();
    }, 1000);



  }



} else{
  console.log("wrong");

  playsound("wrong");

  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");

  startOver();
}

}



function startOver(){

  level = 0;
  gamePattern = [];
  started = false;

}
