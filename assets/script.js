//Variable declaration
var quizElement = document.getElementById("quiz");
var startButton = document.getElementById("start-button");
var mainElement = document.querySelector("main");
var questionElement = document.getElementById("question");
var button1Element = document.getElementById("btn1");
var button2Element = document.getElementById("btn2");
var button3Element = document.getElementById("btn3");
var button4Element = document.getElementById("btn4");
var endPageElement = document.getElementById("end-page");
var scoreDisplay = document.getElementById("score-display");
var submitButton = document.getElementById("submit-button");
var highScoresElement = document.getElementById("high-scores-page");
var returnHomeButton = document.getElementById("return-home");
var timerElement = document.getElementById("timer");
var timer = 120;
var score = 0;
var currentQuestion = 0;
localStorage.setItem("scores","");
var endTimer = false;

//Generates question objects that contain the question, 4 options, and the correct answer
const question1 = {question: "Why is the sky blue", options: ["wrong", "right", "wrong", "wrong"], answer: "right"}
const question2 = {question: "Why is the sky blue", options: ["wrong", "wrong", "wrong", "right"], answer: "right"}
const question3 = {question: "Why is the sky blue", options: ["wrong", "wrong", "wrong", "right"], answer: "right"}

//Creates list of question objects
var questionList = [question1, question2, question3];

//Starts the quiz by hiding the homepage and rendering the first question
function startQuiz() {
    mainElement.style="display:none";
    renderQuestion(questionList[0]);
    quizElement.style="display:flex";
    setTimer();
}

//Renders a question by adding text from a question object to the text of the question element and button elements
function renderQuestion(question) {
    questionElement.textContent = question.question;
    button1Element.textContent = question.options[0];
    button2Element.textContent= question.options[1];
    button3Element.textContent = question.options[2];
    button4Element.textContent = question.options[3];
}

//Checks if the button the user selected is the button to the correct answer. If it is the correct button, the user will gain a point and the next question in the question list will be rendered. If incorrect, the user will lose time and the next question will be rendered
function checkAnswer(button) {
    if(button.textContent === questionList[currentQuestion].answer) {
        score++;
        currentQuestion++;
        if(currentQuestion >= questionList.length) {
            renderEndPage();
            return;
        } else {
            renderQuestion(questionList[currentQuestion]);
        }
        
    } else {
        timer -= 10;
        currentQuestion++;
        if(currentQuestion >= questionList.length) {
            renderEndPage();
            return;
        } else {
            renderQuestion(questionList[currentQuestion]);
        }
    }
}

//Renders the end page of the quiz by hiding the quiz page and main page, but revealing the end page in display: flex
function renderEndPage() {
    endTimer = true;
    mainElement.style="display:none";
    quizElement.style="display:none";
    endPageElement.style="display:flex";
    scoreDisplay.textContent = "Your score: " + score;
}

function renderHighScoresPage(event) {
    event.preventDefault();
    mainElement.style="display:none";
    quizElement.style="display:none";
    endPageElement.style="display:none";
    highScoresElement.style="display:flex";
    let userInitials = document.getElementById("score-input").value;
    localStorage.scores += userInitials + " " + score +",";
    let highScores = localStorage.getItem("scores");
    console.log(highScores);
}

//renders the main page by hiding all other page's elements and setting the main element to display: flex. Additionally it resets the users score, time, and current question
function renderHomePage(event) {
    event.preventDefault();
    mainElement.style="display:flex";
    quizElement.style="display:none";
    endPageElement.style="display:none";
    highScoresElement.style="display:none";
    score = 0;
    timer = 120;
    currentQuestion=0;
    endTimer = false;
}

function setTimer() {
    var timerInterval = setInterval(function() {
    timer--;
    timerElement.textContent = "Time left: " + timer;

    if(timer <= 0) {
        timerElement.textContent = "";
        renderEndPage();
        clearInterval(timerInterval);
    }
    else if(endTimer == true) {
        timerElement.textContent = "";
        clearInterval(timerInterval);
    }

  }, 1000);
}

//Event listeners for all buttons in the webpage
startButton.addEventListener("click", startQuiz);
button1Element.addEventListener("click", function() {checkAnswer(button1Element)});
button2Element.addEventListener("click", function() {checkAnswer(button2Element)});
button3Element.addEventListener("click", function() {checkAnswer(button3Element)});
button4Element.addEventListener("click", function() {checkAnswer(button4Element)});
submitButton.addEventListener("click", renderHighScoresPage);
returnHomeButton.addEventListener("click", renderHomePage);