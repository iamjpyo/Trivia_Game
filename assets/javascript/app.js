$(document).ready(function () {
    // ----------------------------TRIVIA GAME----------------------------
    console.log("game has begun");

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
    var answered = false; //variable to stop the timer if user has clicked an answer
    var correct;
    var triviaGame = [{
        question: "Who did it to em?",
        answer: ["He did it to em", "I did it to em", "Lucky Luciano", "The swagless homie"],
        correct: "2",
        image: ("assets/images/LuckyLuciano.jpg")
    }, {
        question: "Who is the best skater in the world?",
        answer: ["Tony Hawk", "Skater from background image", "Andrew Reynolds", "Kanye West"],
        correct: "3",
        image: ("assets//images/kanyeHawk.png")
    }, {
        question: "Who was at the club?",
        answer: ["That BoyBoy Westcoast", "50 Cent", "Skrillex", "Julian Casablancas"],
        correct: "0",
        image: ("assets//images/theboyboy.jpg")
    }, {
        question: "Who is the greatest rapper of all times?",
        answer: ["2Pac", "Bootychain", "Playboi Carti", "Young Thug"],
        correct: "3",
        image: ("assets//images/thugger.jpg")
    }, {
        question: "Do you ever just: ",
        answer: ["Think about the old times", "Sit in a truck...", "Learn JS", "Miss the good old days"],
        correct: "1",
        image: ("assets/images/truckers.jpg")
    }, {
        question: "Best soccer player of all times: ",
        answer: ["Lionel Messi", "Cristiano Ronaldo", "Alexis Sanchez", "Arturo Vidal"],
        correct: "1",
        image: ("assets//images/cr7.jpg")
    }, {
        question: "Why did Blink-182 break up?",
        answer: ["Tom Delonge believes in aliens", "Mark Hoppus doesn't believe in aliens", "Travis Barker is an alien", "Aliens exist"],
        correct: "3",
        image: ("assets//images/tom.jpg")
    }, {
        question: "Best career?",
        answer: ["Hospitality", "Real Estate", "Web development", "Police"],
        correct: "2",
        image: ("assets//images/coder.jpg")
    }];

    // ------------- FUNCTION DECLARATIONS ----------------------------


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; // stops the timer
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true; //stops the timer
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});