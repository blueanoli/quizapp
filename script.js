function loadGame(){
   document.getElementById('question-body').style = 'display: none';
   document.getElementById('start-screen').style = '';
}

function init() {
   document.getElementById('start-screen').style = 'display: none';
   document.getElementById('question-body').style = '';
   document.getElementById('total-questions').innerHTML = questions.length;
   showCurrentQuestion();
}

function showCurrentQuestion() {

   if (gameIsOver()) {
      showEndScreen();
   } else {
      enableAllAnswers();
      updateProgressBar();
      showFollowingQuestion();
   }
}

function answer(selection) {
   let question = questions[currentQuestion];
   let selectedQuestionNumber = selection.slice(-1);
   let idOfRightAnswer = `answer_${question['right_answer']}`;
   disableAllAnswers();

   if (question['right_answer'] == selectedQuestionNumber) {
      document.getElementById(selection).parentNode.classList.add('bg-success');
      AUDIO_CORRECT.play();
      correctAnswers++;
   } else {
      document.getElementById(selection).parentNode.classList.add('bg-danger');
      document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
      AUDIO_WRONG.play();
   }
   document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
   currentQuestion++;
   document.getElementById('next-button').disabled = true;
   resetAnswers();
   showCurrentQuestion();
}

function resetAnswers() {
   document.getElementById('answer_1').parentNode.classList.remove('bg-success', 'bg-danger');
   document.getElementById('answer_2').parentNode.classList.remove('bg-success', 'bg-danger');
   document.getElementById('answer_3').parentNode.classList.remove('bg-success', 'bg-danger');
   document.getElementById('answer_4').parentNode.classList.remove('bg-success', 'bg-danger');
}

function restartGame() {
   document.getElementById('header-image').src = './img/quizheader.jpg';
   document.getElementById('end-screen').style = 'display: none';
   document.getElementById('question-body').style = '';
   currentQuestion = 0;
   correctAnswers = 0;
   init();
}

function showEndScreen() {
   document.getElementById('end-screen').style = '';
   document.getElementById('question-body').style = 'display: none';
   document.getElementById('progress-bar').parentNode.style = 'display: none';
   document.getElementById('question-amount').innerHTML = questions.length;
   document.getElementById('correct-answers').innerHTML = correctAnswers;
   document.getElementById('header-image').src = './img/trophy.png';
   AUDIO_END.play();
}

function showFollowingQuestion(){
      let question = questions[currentQuestion];

      document.getElementById('current-question').innerHTML = currentQuestion + 1;
      document.getElementById('question-text').innerHTML = question['question'];
      document.getElementById('answer_1').innerHTML = question['answer_1'];
      document.getElementById('answer_2').innerHTML = question['answer_2'];
      document.getElementById('answer_3').innerHTML = question['answer_3'];
      document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar(){
   let percent = currentQuestion / questions.length;
   percent = Math.round(percent * 100);
   document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function gameIsOver() {
   return currentQuestion >= questions.length;
}

function disableAllAnswers() {
   let answers = document.getElementsByClassName('quiz-answer-card');
   for (let i = 0; i < answers.length; i++) {
      answers[i].style.pointerEvents = 'none';
   }

}

function enableAllAnswers() {
   let answers = document.getElementsByClassName('quiz-answer-card');
   for (let i = 0; i < answers.length; i++) {
      answers[i].style.pointerEvents = 'auto';
   }
}