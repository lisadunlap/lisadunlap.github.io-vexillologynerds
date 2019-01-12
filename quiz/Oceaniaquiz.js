

(function() {
  var questions = [

    {"question":"https://image.ibb.co/kmkXAk/australia.png",
    "choices":["Papua New Guinea","Fiji","Tonga","Australia"],
    "correctAnswer":4},

    {"question":"https://image.ibb.co/cs9Oi5/cookislands.png",
    "choices":["Cook Island","New Zealand","Australia","Fiji"],
    "correctAnswer":1},

    {"question":"https://image.ibb.co/mYF7Ak/easttimor.png",
    "choices":["Tuvalu","East Timor","Fiji","Tuvalu"],
    "correctAnswer":2},

    {"question":"https://image.ibb.co/bVrQwQ/fiji.png",
    "choices":["Marshall Islands","New Zealand","Indonesia","Fiji"],
    "correctAnswer":4},

    {"question":"https://image.ibb.co/dTzOi5/indonesia.png",
    "choices":["Indonesia","Marshall Islands","Solomon Islands","Kiribati"],
    "correctAnswer":1},

    {"question":"https://image.ibb.co/fEnb35/kiribati.png",
    "choices":["Fiji","Kiribati","Nauru","New Zealand"],
    "correctAnswer":2},

    {"question":"https://image.ibb.co/dbfUO5/marrshallislands.png",
    "choices":["Marshall Islands","Papua New Guinea","New Zealand","Indonesia"],
    "correctAnswer":1},

    {"question":"https://image.ibb.co/kCTuqk/micrconesia.png",
    "choices":["Vanuatu","Micronesia","Tonga","Kiribati"],
    "correctAnswer":2},

    {"question":"https://image.ibb.co/hAWEqk/nauru.png",
    "choices":["Samoa","Palau","Nauru","Australia"],
    "correctAnswer":3},

    {"question":"https://image.ibb.co/iG6QwQ/newzealand.png",
    "choices":["Palau","New Zealand","Vanuatu","Palau"],
    "correctAnswer":2},

    {"question":"https://image.ibb.co/i5c4qk/niue.png",
    "choices":["Samoa","Niue","Kiribati","Marshall Islands"],
    "correctAnswer":2},

    {"question":"https://image.ibb.co/nCJAVk/palau.png",
    "choices":["Solomon Islands","East Timor","Papua New Guinea","Palau"],
    "correctAnswer":4},

    {"question":"https://image.ibb.co/jM52bQ/papuanewguinea.png",
    "choices":["East Timor","Papua New Guinea","Marshall Islands","Solomon Islands"],
    "correctAnswer":2},

    {"question":"https://image.ibb.co/m4hR35/samoa.png",
    "choices":["Samoa","Cook Islands","New Zealand","East Timor"],
    "correctAnswer":1},

    {"question":"https://image.ibb.co/iW0Pqk/solomonislands.png",
    "choices":["Australia","Micronesia","Solomon Islands","Kiribati"],
    "correctAnswer":3},

    {"question":"https://image.ibb.co/dvWm35/tonga.png",
    "choices":["Tonga","Micronesia","Nauru","Nauru"],
    "correctAnswer":1},

    {"question":"https://image.ibb.co/gw9jqk/tuvalu.png",
    "choices":["Vanuatu","Solomon Islands","Tuvalu","Vanuatu"],
    "correctAnswer":3},

    {"question":"https://image.ibb.co/eMTAVk/vanuatu.png",
    "choices":["Palau","Solomon Islands","Cook Islands","Vanuatu"],
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
