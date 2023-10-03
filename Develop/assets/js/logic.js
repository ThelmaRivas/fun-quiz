//Create variables for countdown and questions
var questionIndex = 0;
var time = questions.length * 15;
var timer;


//First call the variables
var questionsEl = document.getElementById('questions');
var timeEl = document.getElementById('time');
var answerEl = document.getElementById('answer');
var optionsEl = document.getElementById('options');
var startbutton = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var submitbutton = document.getElementById('submit');


//Now create the function that start the quiz as we click on the start button
//Applying computational thinking, first hide and unhide the elements we see on the mock-up and then run the timer as the quiz starts
function startQuiz() {
  //Hide start class and show questionsEl
  var startEl = document.getElementById('start-quiz');
  //give it the class of hide
  startEl.setAttribute('class', 'hide');

  //Show questionsEl by removing its class since it has hide class
  questionsEl.removeAttribute('class');

  //Start the countdown and show the time
  timer = setInterval(clockTick, 1000);
  timeEl.textContent = time;


  //call a fuction thats keeping track of the questions as we answer the quiz
  nextQuestion();

}

//Here we are creating the function thats keeping track of the answered questions
//Again applying CT, first we will call the next question as the user answers and keep track of the index we are in the questionsEl array 
function nextQuestion() {

  //get the question based on the index in questionsEl 
  var currentQuestion = questions[questionIndex];

  //Call the variable that contains the h2 question 
  var questionEl = document.getElementById('question');
  questionEl.textContent = currentQuestion.title;

  //Erase the multiple choices of the previous question
  optionsEl.innerHTML = '';

  //Create a for loop to make every option a button that the user can choose 
  for (var i = 0; i < currentQuestion.options.length; i++) {
    //First create var option for the loop to work, then create a node of all the choices that we will append to the html
    var option = currentQuestion.options[i];
    var optionNode = document.createElement('button');
    optionNode.setAttribute('class', 'option');
    optionNode.setAttribute('value', option);

    optionNode.textContent = i + 1 + '.' + option;
    //Appeal them all together at the end, after them are buttons
    optionsEl.appendChild(optionNode);
  }

}


function questionClick(event) {
  var buttonEl = event.target;

  //if the user doesnt click on a multiple choice, then inmediatly stop
  if (!buttonEl.matches('.option')) {
    return;
  }

  //If the user's answer is incorrect, then penalize with 10 seconds
  if (buttonEl.value !== questions[questionIndex].answer) {
    time -= 15;
    //If timer reaches 0, then do nothing
    if (time < 0) {
      time = 0;
    }

    //update the timer 
    timeEl.textContent = time;
    //Display the answer on the hiding element
    answerEl.textContent = "Wrong!";
  } else {
    //if the user chooses the correct answer then display correct 
    answerEl.textContent = "Correct!";
  }

  //Unhide just for a second if the answer is correct or wrong with the settimeout function
  answerEl.setAttribute('class', 'answer');
  setTimeout(function () {
    answerEl.setAttribute('class', 'answer hide')
  }, 1000);

  //Update the QuestionIndex, to keep track of the questions that have been answer
  questionIndex++;

  //Check if there is any question left after every question answered by the user
  if (time <= 0 || questionIndex === questions.length) {
    //Then all the question have been answered, and the quiz has end
    finishQuiz();
  } else {
    //If there are still questions left, then move on to the next index of the questions by calling the function nextQuestion()
    nextQuestion();
  }

}

//Create the function finishQuiz(), that gonna trigger when there isnt question left

function finishQuiz() {
  //first, if timer is not on 0 already, end timer
  clearInterval(timer);

  //Hide questions and show the screen where the final grade is display
  var endQuiz = document.getElementById('finish');
  endQuiz.removeAttribute('class');

  var grade = document.getElementById('final-grade');
  grade.textContent = time;

  questionsEl.setAttribute('class', "hide");
}

//with the finishQuiz() declare, we can now trigger it earlier if the user runs out of time

//Create the function that will end the quiz earlier, based on the time left 

function clockTick() {
  time--;
  timeEl.textContent = time;

  //Verify the time left to see if the quiz should end
  if (time <= 0) {
    finishQuiz();
  }
}


//Applying CT, when we pass through all the sreens and the quiz ends, then we save the final grade of the user and ask the user for their initials to have a record of final grades

function finalGrades() {
  var initials = initialsEl.value.trim();
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  //Reset values
  var newgrade = {
    score: time,
    initials: initials,
  };

  //Save it to localstorage with the setitem method
  highscores.push(newgrade);
  window.localStorage.setItem('highscores', JSON.stringify(highscores));

  //Move to the highschores.html
  window.location.href = 'highscores.html'

};

//Now that we have declare all of our function, we can declare the buttons function

submitbutton.onclick = finalGrades;
startbutton.onclick = startQuiz;
optionsEl.onclick = questionClick;
