//global variables that will be used to change the html of the page.
var question = document.querySelector("#quiz-question");
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");
var startButton = document.querySelector(".start-button");
var mainPage = document.querySelector(".startingSection");
var quizPage = document.querySelector(".quizSection");
var answerButton = document.querySelectorAll(".answer-button");
var scoreButton = document.querySelector(".score-button");
var correctBox = document.querySelector(".correctSection");
var incorrectBox = document.querySelector(".incorrectSection");
var endPage = document.querySelector(".endSection");
var scorePage = document.querySelector(".scoreSection");
var finalScore = document.querySelector("#score");
var timerBox = document.querySelector("#timer");
var userInitials = document.querySelector("#user-initials");
var nameList = document.querySelector("#name-place");
var scoreList = document.querySelector("#score-place");
var timeList = document.querySelector("#time-place");
var clearButton = document.querySelector(".clear-button");
var scoreArea = document.querySelector(".score-area");
var scorePageButton = document.querySelector(".score-page-button");
var homePageButton = document.querySelector(".home-page-button");
//variable for tracking the time
var timeInterval;
//array that will be filled with user names
var names = [];
//array that will be filled with user scores
var scores = [];
//array that will be filled with user times
var times = [];
//tracking variable for the correct score
var correctScore;
//tracking variable for the questions
var currentQuestion;
//starting time variable
const startingTime = 90;
//time variable that counts down
var timeLeft;
//object that holds all of the questions and answers with the correct answer
const questions = [
    {
        question: 'What is the only enemy of an orca whale?',
        answers: {
            a: 'great white sharks.',
            b: 'giant squid.',
            c: 'man.',
            d: 'other whales.',
        },
        correctAnswer: 'c'
    },
    {
        question: 'What is the only difference in features between the male and female orcas?',
        answers: {
            a: 'color.',
            b: 'size and shape of the fins.',
            c: 'color of eyes.',
            d: 'size of teeth.',
        },
        correctAnswer: 'b'
    },
    {
        question: 'Where can orcas be found?',
        answers: {
            a: 'Arctic ocean.',
            b: 'Pacific ocean.',
            c: 'All oceans.',
            d: 'Atlantic ocean.',
        },
        correctAnswer: 'c'
    },
    {
        question: 'What does it mean when an orca breaches?',
        answers: {
            a: 'To mess around.',
            b: 'It means they are ready to give birth.',
            c: 'They are out of oxygen.',
            d: 'To try to fly.',
        },
        correctAnswer: 'a'
    },
    {
        question: 'Why is the orca called the killer whale?',
        answers: {
            a: 'Has killed humans.',
            b: 'Will kill and eat each other.',
            c: 'They have been known to kill whales.',
            d: 'They have visous personalities.',
        },
        correctAnswer: 'c'
    },
    {
        question: 'About how fast can an orca swim at top speed?',
        answers: {
            a: 'Over 60 mph.',
            b: 'Up to 30 mph.',
            c: 'Less than 5 mph.',
            d: 'Up to 40-50 mph.',
        },
        correctAnswer: 'b'
    },
    {
        question: 'What did the Nootka Indians of Vancouver Island call the orca whale?',
        answers: {
            a: 'Black beast of the sea.',
            b: 'Black fish.',
            c: 'Water giant.',
            d: 'Bear fish.',
        },
        correctAnswer: 'b'
    },
    {
        question: 'How do orcas hunt?',
        answers: {
            a: 'Tossing prey into the air.',
            b: 'Using there tails to stun.',
            c: 'Shooting lazer beams.',
            d: 'Head butts.',
        },
        correctAnswer: 'b'
    },
];


//when start button is pressed it starts the quiz.
startButton.addEventListener("click",function(){
    startQuiz();

});
//event listener that listens for the 4 buttons that have the answers attached to them. 
answerButton.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        //as the current question goes up the load question and load answers will load each question and answer
        currentQuestion++;
        loadQuestion();
        loadAnswers();
        var buttonValue = event.target.value;
        //when all of the questions are used it will call upon the loadend function to transition to the end
        if(currentQuestion >= 7){
            loadEnd();
        }
        //checks to see if it is the correct answer and will add 1 to the correctscore tracking variable
        if(currentQuestion <= questions.length -1 && buttonValue === questions[currentQuestion-1].correctAnswer){
            showCorrect();
            correctScore++;
        //if it isn't the correct answer the time goes down and it shows the incorrect circle
        } else if (currentQuestion <= questions.length -1){
            showIncorrect();
            timeLeft -= 10;
            return timeLeft;
        }
    })
  });
//when the score button is clicked it will add the tracking variables into the local storage array and will then show the scores based off of local storage
scoreButton.addEventListener("click",function(event){
    event.preventDefault();
    
    if (userInitials === ""){
        console.log("test");
    } else {
        pushScores();
        loadScorePage();
        renderScores();
    }
});
//when the clear button is clicked it clears the local storage and clears the score div
clearButton.addEventListener("click",function(event){
    event.preventDefault();
    localStorage.clear();
    scoreArea.innerHTML = "";
});
//when score page button is pressed it takes the user to the score page
scorePageButton.addEventListener("click",function(event){
    event.preventDefault();
    mainPage.style.display = "none";
    scorePage.style.display = "block";
    
});
//when home page button is pressed it takes the user to the home page
homePageButton.addEventListener("click",function(event){
    event.preventDefault();
    mainPage.style.display = "block";
    scorePage.style.display = "none";
});

//this is the function that starts the quiz
function startQuiz(){
    mainPage.style.display = "none";
    quizPage.style.display = "block";
    currentQuestion = 0;
    correctScore = 0;
    getScores();
    loadQuestion();
    loadAnswers();
    startTimer();
}
//this is the timer function that counts down from 1:30
function startTimer() {
    timeLeft = startingTime;
  
    timeInterval = setInterval(function() {
      timerBox.textContent = Math.floor(timeLeft/60)+":"+ formatTime(timeLeft%60);
      timeLeft--;
  
      if (timeLeft === 0) {
        timerBox.textContent = "";
        loadEnd();
        clearInterval(timeInterval);
      }
      
    }, 1000);
  }
//function that formats the time to show minutes and seconds
function formatTime(timeLeft) {
    return (timeLeft < 10 ? "0" + timeLeft : "" + timeLeft);
}

//this function loads the questions based off of the currentQuestion tracking variable
function loadQuestion(){
    if (currentQuestion <= questions.length -1){
        question.textContent = questions[currentQuestion].question;
    } else {
        return;
    }
}
//this function loads the answers based off of the currentQuestion tracking variable
function loadAnswers(){
    if (currentQuestion <= questions.length -1){
        answer1.textContent = questions[currentQuestion].answers.a;
        answer2.textContent = questions[currentQuestion].answers.b;
        answer3.textContent = questions[currentQuestion].answers.c;
        answer4.textContent = questions[currentQuestion].answers.d;
    } else {
        return;
    }
}
//this shows a small green circle if its the correct answer for half a second
function showCorrect() {
    var timeLeft = 2;
  
    var timeInterval = setInterval(function() {
    
      timeLeft--;
      correctBox.style.display = "block";
  
      if (timeLeft === 0) {
        correctBox.style.display = "none";
        clearInterval(timeInterval);
      }
  
    }, 500);
}
//this shows a small red circle if its an incorrect answer for half a second
function showIncorrect() {
    var timeLeft = 2;
  
    var timeInterval = setInterval(function() {
    
      timeLeft--;
      incorrectBox.style.display = "block";
  
      if (timeLeft === 0) {
        incorrectBox.style.display = "none";
        clearInterval(timeInterval);
      }
  
    }, 500);
}
//this function loads the end page
function loadEnd() {
    quizPage.style.display = "none";
    endPage.style.display = "block";
    clearInterval(timeInterval);
}
//this function loads the score page
function loadScorePage(){
    endPage.style.display = "none";
    scorePage.style.display = "block";

}
//this function stores the score arrays
function storeScores() {
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('scores', JSON.stringify(scores));
    localStorage.setItem('times', JSON.stringify(times));
}
//this function retrieves the score arrays and parses them
function getScores() {
    var storedNames = JSON.parse(localStorage.getItem("names"));
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    var storedTimes = JSON.parse(localStorage.getItem("times"));

    if (storedNames !== null){
        names = storedNames;
        scores = storedScores;
        times = storedTimes;
    }

}
//this function prints the score arrays to the score page
function renderScores() {
    nameList.innerHTML = "";
    scoreList.innerHTML = "";
    timeList.innerHTML = "";

    for (var i = 0; i < names.length; i++){
        var name = names[i];
        var score = scores[i];
        var time = times[i];

        var h5 = document.createElement("h5");
        h5.textContent = name;
        nameList.appendChild(h5);

        var h5 = document.createElement("h5");
        h5.textContent = score;
        scoreList.appendChild(h5);

        var h5 = document.createElement("h5");
        h5.textContent = time;
        timeList.appendChild(h5);
    }
}
//this function pushes the tracking variables into the score arrays.
function pushScores() {
    names.push(userInitials.value);
    scores.push(correctScore);
    times.push(timeLeft);
    storeScores();
    getScores();
}




  