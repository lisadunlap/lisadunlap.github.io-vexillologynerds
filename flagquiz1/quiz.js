

(function() {
  var questions = [

  	{"question":"https://image.ibb.co/gsr8RF/Flag_of_Alabama_svg.png",
  	"choices":["Nebraska","Alabama","New Jersey","Texas"],
  	"correctAnswer":2},

  	{"question":"https://image.ibb.co/edGL6F/alaska.png",
  	"choices":["Alaska","Maryland","Michigan","Kansas"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/mV2MDv/arizona.png",
  	"choices":["8","2","0","6"],
  	"correctAnswer":3},

  	{"question":"https://image.ibb.co/msJTtv/arkansas.jpg",
  	"choices":["John Glenn","Yuri Gagarin","Neil Armstrong","Buzz Aldrin"],
  	"correctAnswer":1},

  	{"question":"https://image.ibb.co/nssXLa/california.jpg",
  	"choices":["Sun","Betelguese","Vega"],
  	"correctAnswer":2}

    {"question":"https://image.ibb.co/bQ6WDv/colorado.jpg",
  	"choices":["Sun","Betelguese","Vega"],
  	"correctAnswer":2}

    {"question":"https://image.ibb.co/gh8p0a/conneticut.jpg",
  	"choices":["Sun","Betelguese","Vega"],
  	"correctAnswer":2}

    {"question":"https://image.ibb.co/jiv2La/delaware.gif",
  	"choices":["Sun","Betelguese","Vega"],
  	"correctAnswer":2}

    {"question":"https://image.ibb.co/i3xtRF/florida.png",
  	"choices":["Sun","Betelguese","Vega"],
  	"correctAnswer":2}

    {"question":"https://image.ibb.co/dKT6fa/georgia.png",
  	"choices":["Sun","Betelguese","Vega"],
  	"correctAnswer":2}

    {"question":"https://image.ibb.co/e7cGfa/hawaii.gif",
  	"choices":["Sun","Betelguese","Vega"],
  	"correctAnswer":2}

    {"question":"https://image.ibb.co/iuAV6F/idaho.jpg",
    "choices":["Sun","Betelguese","Vega"],
    "correctAnswer":2}

    {"question":"https://image.ibb.co/n7ee0a/illinois.gif",
  	"choices":["Sun","Betelguese","Vega"],
  	"correctAnswer":2}

    {"question":"https://image.ibb.co/dC4ZYv/indiana.png",
  	"choices":["Sun","Betelguese","Vega"],
  	"correctAnswer":2}

    {"question":"https://image.ibb.co/b8vV6F/iowa.jpg",
    "choices":["Sun","Betelguese","Vega"],
    "correctAnswer":2}

    {"question":"https://image.ibb.co/n7ydtv/kansas.gif",
    "choices":["Sun","Betelguese","Vega"],
    "correctAnswer":2}

    {"question":"https://image.ibb.co/frKjYv/kenttucky.gif",
    "choices":["Sun","Betelguese","Vega"],
    "correctAnswer":2}

    {"question":"https://image.ibb.co/eqRytv/louisiana.jpg",
    "choices":["Sun","Betelguese","Vega"],
    "correctAnswer":2

    {"question":"https://image.ibb.co/hSuVQk/maine.jpg",
    "choices":["Sun","Betelguese","Vega"],
    "correctAnswer":2}

    {"question":"https://image.ibb.co/nmnvrQ/maryland.png",
    "choices":["Sun","Betelguese","Vega"],
    "correctAnswer":2}
  ];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

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

    var question = $('<p>').append('<img src = "'+questions[index].question+'">');
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
