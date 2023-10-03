//First idea was to do variables: question1, question2, etc... and then and array of answers to question1, to question2 and so on. 

//After asking for help, they told me there was an easier way. Put all questions, multiple choices and the correct answer in one variable that would be a big string.

//Variable that is an array that contains strings with all the questions, multiple choices and the correct answers
var questions = [
  { title: 'Commonly used data types DO NOT include:', options: ['Strings', 'Booleans', 'Alerts', 'Numbers'], answer: 'Alerts' },

  { title: 'The condition in an if/else statement is enclosed within ___.', options: ['Quotes', 'Curly brackets', 'Parentheses', 'Square brackets'], answer: 'Parentheses' },

  { title: 'Arrays in JavaScript can be used to store ___.', options: ['Numbers and strings', 'Other arrays', 'Booleans', 'All of the above'], answer: 'All of the above' },

  { title: 'String values must be enclosed within ___ when being assigned to variables.', options: ['Commas', 'Curly brackets', 'Quotes', 'Parentheses'], answer: 'Quotes' },

  { title: 'A very useful tool used during development and debugging for printing content to the debugger is:', options: ['JavaScript', 'Terminal/Bash', 'For loops', 'Console.log'], answer: 'Console.log' },

];



