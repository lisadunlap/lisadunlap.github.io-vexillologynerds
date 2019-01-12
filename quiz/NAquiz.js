

(function() {
  var questions = [

    {"question":"https://image.ibb.co/nQvhrQ/antigua_barbuda.png",
  	"choices":["Trinidad and Tobago","Honduras","Antigua and Barbuda","Honduras"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/bMB5BQ/bahamas.png",
  	"choices":["USA","Costa Rica","Bahamas","Greneda"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/jSS1kk/barbados.png",
  	"choices":["Hati","Barbados","Honduras","Panama"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/fquE5k/belize.png",
  	"choices":["Dominican Republic","Bahamas","Mexico","Belize"],
  	"correctAnswer":4},

  	{"question":"https://image.ibb.co/fOEE5k/canada.png",
  	"choices":["Honduras","Antigua and Barbuda","Canada","Antigua and Barbuda"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/cy43y5/costarica.png",
  	"choices":["Hati","Costa Rica","Jamaica","El Salvidor"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/ms6Bkk/cuba.png",
  	"choices":["Cuba","Nicaragua","Dominican Republic","Saint Lucia"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/bDUaBQ/dominica.png",
  	"choices":["Cuba","Nicaragua","Dominica","Honduras"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/iW8rkk/dominicanrepublic.png",
  	"choices":["Dominican Republic","Saint Vincent and the Grenadines","Dominica","Nicaragua"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/hvq45k/elsalvador.png",
  	"choices":["Panama","Trinidad and Tobago","Canada","El Salvidor"],
  	"correctAnswer":4},

  	{"question":"https://image.ibb.co/grZmJ5/grenada.png",
  	"choices":["Barbados","Saint Kitts and Nevis","Antigua and Barbuda","Grenada"],
  	"correctAnswer":4},

  	{"question":"https://image.ibb.co/hnjQBQ/guatemala.png",
  	"choices":["Guatemala","Greneda","Nicaragua","Honduras"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/fJ5yWQ/haiti.png",
  	"choices":["Jamaica","Haiti","Nicaragua","Guatemala"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/mYAbJ5/honduras.png",
  	"choices":["Bahamas","Honduras","Saint Lucia","Bahamas"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/eKknQk/jamacia.png",
  	"choices":["Nicaragua","Bahamas","Jamacia","El Salvidor"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/jwqnQk/mexico.png",
  	"choices":["Mexico","Guatemala","Dominican Republic","Honduras"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/hUUE5k/nicaragua.png",
  	"choices":["Hati","Greneda","Guatemala","Nicaragua"],
  	"correctAnswer":4},

  	{"question":"https://image.ibb.co/knvbJ5/panama.png",
  	"choices":["Hati","Greneda","Guatemala","Panama"],
  	"correctAnswer":4},

  	{"question":"https://image.ibb.co/dRjE5k/saintkitts_nevis.png",
  	"choices":["Barbados","Saint Kitts and Nevis","Dominican Republic","Costa Rica"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/cbFnQk/saintlucia.png",
  	"choices":["Saint Vincent and the Grenadines","Mexico","Saint Lucia","Bahamas"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/gCnCrQ/saintvincent_thegrenadines.png",
  	"choices":["Canada","Saint Vincent and the Grenadines","Nicaragua","Mexico"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/dHhZ5k/trinidad_tobago.png",
  	"choices":["Trinidad and Tobago","Nicaragua","Dominican Republic","Panama"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/cUxqd5/us.png",
  	"choices":["Canada","Hati","Saint Kitts and Nevis","US"],
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
