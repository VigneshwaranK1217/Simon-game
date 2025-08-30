// Required variables
var computerArr = []; // Array to store computer sequence
var userArr = []; // Array to store user sequence
var levelCount = 0;
var userCount = 1; // Variable to check the current state of the user
var index = 0;
let cFlag = true;
let uFlag = false;

// Array to store the button elements
var buttonArr = document.querySelectorAll(".btn");

// Function to animate the button click
function buttonAnimation(cls){
    $("."+cls).addClass("pressed");
    setTimeout(() => { $("."+cls).removeClass("pressed"); }, 200);
}

// Keypress event listener to initialize the game
document.addEventListener("keypress", (event) => {
    if (cFlag){
        computerSequence();
        cFlag = false;
    }
});

// Mouse click event to compare with computer sequence
$(".btn").on("click",(event) => {
    if (uFlag){
        userSequence(event);
    }
});

// Function to generate random sequence by the computer
function computerSequence(){

    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonArr[randomNumber].id;

    levelCount++;
    $("h1").text("Level " + levelCount);
       
    buttonAnimation(randomColor);
    var randomAudio = new Audio("sounds/"+randomColor+".mp3");
    randomAudio.play();

    computerArr.push(randomColor);
    console.log("computerArr",computerArr);

    uFlag = true;

}

// Function for the user Behaviour 
function userSequence(event){
    var userColor = event.target.id;

    console.log(event.target.id);

    buttonAnimation(userColor);
    var userAudio = new Audio("sounds/"+userColor+".mp3");
    userAudio.play();

    userArr.push(userColor);
    console.log("userArr", userArr);

    if(computerArr[index] != userArr[index]){ // Compare the button clicked at each index

        $("h1").text("Oops!, game Over press any key to restart");

        $("body").addClass("game-over");

        setTimeout(() => { $("body").removeClass("game-over"); }, 200);
        var userAudio = new Audio("sounds/wrong.mp3");
        userAudio.play();
        
        // If true reinitialize everything
        levelCount = 0;
        index = 0;
        userCount = 1;
        computerArr = [];
        userArr = [];
        cFlag = true;
        uFlag = false;

    } else if(userCount === levelCount){ // Reinitialize everything related to user to start fresh at the next level

            userCount = 1;
            index = 0;
            userArr = [];
            uFlag = false;
            setTimeout(() => { computerSequence(); }, 1000);
            
    } else {
        userCount++;
        index++;
    }
    
}
