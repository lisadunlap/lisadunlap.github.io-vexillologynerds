

(function() {
  var questions = [

    {"question":"https://image.ibb.co/mYQCO5/argentina.png",
  	"choices":["Guyana","Brazil","Argentina","Ecuador"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/eip6i5/aruba.png",
  	"choices":["Colombia","Aruba","Brazil","Colombia"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/eucFbQ/bolivia.png",
  	"choices":["Argentina","Bolivia","Colombia","Chile"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/enSsO5/brazil.png",
  	"choices":["Peru","Paraguay","Ecuador","Brazil"],
  	"correctAnswer":4},

  	{"question":"https://image.ibb.co/kaRVAk/caribbeannetherlands.gif",
  	"choices":["Colombia","Paraguay","Caribbean Netherlands","Brazil"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/ngHRi5/chile.png",
  	"choices":["Chile","Guyana","Peru","Paraguay"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/f2bxqk/columbia.png",
  	"choices":["Columbia","Venezuela","Paraguay","Bolivia"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/m6oowQ/curaco.png",
  	"choices":["Colombia","Peru","Uruguay","Curaco"],
  	"correctAnswer":4},

  	{"question":"https://image.ibb.co/ireTwQ/ecuador.png",
  	"choices":["Chile","Uruguay","Ecuador","Falkland Islands"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/gwTcqk/falklandislands.png",
  	"choices":["Falkland Islands","Chile","Guyana","Frech Guiana"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/m7eiVk/frenchguiana.png",
  	"choices":["Frech Guiana","Ecuador","Venezuela","Guyana"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/hX8MGQ/guyana.png",
  	"choices":["Bolivia","Guyana","Brazil","Chile"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/dJNywQ/paraguay.png",
  	"choices":["Guyana","Paraguay","Peru","Argentina"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/jshywQ/peru.gif",
  	"choices":["Caribbean Netherlands","Peru","Ecuador","Argentina"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/dEjBGQ/suriname.png",
  	"choices":["Paraguay","Uruguay","Suriname","Brazil"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/dHhZ5k/trinidad_tobago.png",
  	"choices":["Trinidad and Tobago","Frech Guiana","Paraguay","Bolivia"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/kWKp35/uruguay.gif",
  	"choices":["Caribbean Netherlands","Suriname","Colombia","Uruguay"],
  	"correctAnswer":4},

  	{"question":"https://image.ibb.co/nyVJwQ/venezuela.png",
  	"choices":["Venezuela","Caribbean Netherlands","Caribbean Netherlands","Venezuela"],
  	"correctAnswer":4},

  ];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  //shuffle questions
  Array.prototype.shuffle = function() {
   var input = this;

   for (var i = input.length-1; i >=0; i--) {

       var randomIndex = Math.floor(Math.random()*(i+1));
       var itemAtIndex = input[randomIndex];

       input[randomIndex] = input[i];
       input[i] = itemAtIndex;
   }
   return input;
 }

 questions.shuffle();

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {id: 'question'});

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append('<img class="question" src = "'+questions[index].question+'" height="200" width ="300">');
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();
