// alert("Working!")

var userClickedPattern = []
var gamePattern = []

var buttonColours = ["red", "blue", "green", "yellow"]

function playSound(name){
    var colourSound = new Audio("sounds/" + name + ".mp3");
    colourSound.play();
}

function nextSequence() {
    userClickedPattern = []

    var randomNumber = Math.floor(Math.random() * Math.floor(3));
    var randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
    level++;
    $("h1").text( "Level "+ level);
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}

function startOver(){
    level=0
    gamePattern = []
    userClickedPattern=[]
    $(document).one("keypress", function (){
    
        level=0;
        nextSequence();
        $("h1").attr("html", "Level 0");
    
    })
}


$(document).one("keypress", function (){
    
    level=0;
    nextSequence();
    $("h1").attr("html", "Level 0");

})


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")
         if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
         }
    } else {
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()
    }

}



//driver code
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1)
})