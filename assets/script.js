//global variables that will be used to change the html of the page.
var question = document.querySelector("#quiz-question")
var answer1 = document.querySelector("#answer-1")
var answer2 = document.querySelector("#answer-2")
var answer3 = document.querySelector("#answer-3")
var answer4 = document.querySelector("#answer-4")
var startButton = document.querySelector(".start-button")
var mainPage = document.querySelector(".startingSection")
var quizPage = document.querySelector(".quizSection")
var answerButton = document.querySelectorAll(".answer-button")
var scoreButton = document.querySelector(".score-button")
var correctBox = document.querySelector(".correctSection")
var incorrectBox = document.querySelector(".incorrectSection")
var endPage = document.querySelector(".endSection")
var scorePage = document.querySelector(".scoreSection")
var finalScore = document.querySelector("#score")
var timerBox = document.querySelector("#timer")
var userInitials = document.querySelector("#user-initials")
var correctScore = 0;
var currentQuestion = 0;
const startingTime = 90;
var timeLeft 

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
]



startButton.addEventListener("click",function(){
    startQuiz();

})

answerButton.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        currentQuestion++;
        loadQuestion();
        loadAnswers();
        var buttonValue = event.target.value;
        console.log(event.target.value);
        console.log(questions[currentQuestion].correctAnswer)
        if(currentQuestion >= 7){
            loadEnd();
        }
        if(currentQuestion <= questions.length -1 && buttonValue === questions[currentQuestion-1].correctAnswer){
            showCorrect();
            correctScore++;
        } else if (currentQuestion <= questions.length -1){
            showIncorrect();
            timeLeft -= 10;
            return timeLeft;
        }
    })
  })

scoreButton.addEventListener("click",function(event){
    event.preventDefault();
    
    if (userInitials === ""){
        console.log("test");
    } else {
        loadScorePage();
    }
    

})

function startQuiz(){
    mainPage.style.display = "none";
    quizPage.style.display = "block";
    loadQuestion();
    loadAnswers();
    startTimer();
}

function startTimer() {
    timeLeft = startingTime;
  
    var timeInterval = setInterval(function() {
      timerBox.textContent = Math.floor(timeLeft/60)+":"+ formatTime(timeLeft%60);
      timeLeft--;
  
      if (timeLeft === 0) {
        timerBox.textContent = "";
        clearInterval(timeInterval);
      }
  
    }, 1000);
  }

function formatTime(timeLeft) {
    return (timeLeft < 10 ? "0" + timeLeft : "" + timeLeft);
}


function loadQuestion(){
    if (currentQuestion <= questions.length -1){
        question.textContent = questions[currentQuestion].question;
    } else {
        return;
    }
}

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

function loadEnd() {
    quizPage.style.display = "none";
    endPage.style.display = "block";
}

function loadScorePage(){
    endPage.style.display = "none";
    scorePage.style.display = "block";
}



  