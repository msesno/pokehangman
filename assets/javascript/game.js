    
    var wins = 0;
    var loses = 0;
    // var firstTime = 1;


    function newGame() {
        wins = 0;
        loses = 0;
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("loses").innerHTML = loses;

        hangMan();
    }



    function hangMan() {

        // Variables
        var guessWord = [];
        var gameWord = [];
        var guessesAllowed = 0;
        var letters = [];
        var guessLetter = [];
        var wordList = [
            "pikachu", "squirtle", "charmander", "bulbasaur", "articuno",
        ];

        document.getElementById("word").innerHTML = null;
        gameWordPick = wordList[Math.floor(Math.random() * 4) + 0];
        for (var i = 0; i < gameWordPick.length; i++) {
            gameWord.push(gameWordPick[i]);
            guessWord.push("_");
            //-- count the unique letters in the gameWord
            if (letters.indexOf(gameWordPick[i]) === -1) {
                letters.push(gameWordPick[i]);
            }
        }
        var guessWordString = guessWord.toString();
        var guessWordClean = guessWordString.replace(/,/g, " ");

        document.getElementById("guessword").innerHTML = guessWordClean;
        document.getElementById("misses").innerHTML = null;

        var play = confirm("The theme is pokemon. Click OK for hard, or CANCEL for easy.");

        if (play == true) {
            guessesAllowed = 10; //-- 10 guesses for hard play
        } else {
            guessesAllowed = 20; //-- 20 guesses for easy play
        }
        console.log(guessesAllowed);

        // console.log(gameWord);
        var gameWordString = gameWord.toString();
        var gameWordClean = gameWordString.replace(/,/g, "");

        document.getElementById("guesses").innerHTML = guessesAllowed;

        document.onkeyup = function(event) {
            console.log(event);
            var keyCode = event.keyCode;


            if (guessWord.indexOf('_') != -1 && guessesAllowed >= 0) {
                //-check for input for letters
                if (keyCode > 64 && keyCode < 91) {
                    var keyPress = event.key.toLowerCase();
                    if (gameWord.indexOf(keyPress) > -1 && guessWord.indexOf("_") > -1) {
                        var idx = gameWord.indexOf(keyPress);
                        guessesAllowed = guessesAllowed - 1;
                        // console.log(idx , "before while");
                        while (idx != -1) { //do while to catch double letter
                            guessWord.splice(idx, 1, keyPress);
                            idx = gameWord.indexOf(keyPress, idx + 1);
                            // console.log(idx , "after while");  
                        }
                        var guessWordString = guessWord.toString(); //guessWord.join();
                        var guessWordClean = guessWordString.replace(/,/g, " ");
                        document.getElementById("guessword").innerHTML = guessWordClean;
                        document.getElementById("guesses").innerHTML = guessesAllowed;
                    } else {
                        //-- this builds the array for letters used that are misses
                        if (guessLetter.indexOf(keyPress) === -1 && gameWord.indexOf(keyPress) === -1 && guessesAllowed != 0) {
                            guessLetter.push(keyPress);
                            guessesAllowed = guessesAllowed - 1;

                            var guessLetterString = guessLetter.toString();
                            var guessLetterClean = guessLetterString.replace(/,/g, " ");
                            document.getElementById("guesses").innerHTML = guessesAllowed;
                            document.getElementById("misses").innerHTML = guessLetterClean;


                        } else if (guessesAllowed === 0) {
                            loses = loses + 1;
                            document.getElementById("loses").innerHTML = loses;
                            alert("You almost caught the " + gameWordClean + ", but try again. Your word was: " + gameWordClean);
                            // firstTime = 0;
                            hangMan();
                        } else {
                            console.log("you already used \'", keyPress, "\'.")
                        }
                    }
                } else {
                    alert('That was \"' + event.key + '\". Please click a letter instead.');
                }
                if (guessWord.indexOf('_') === -1 && guessesAllowed >= 0) {
                    // firstTime = 0;
                    alert("Congratulations, you caught the " + gameWordClean + ". Your word was: " + gameWordClean);
                    wins = wins + 1;
                    document.getElementById("wins").innerHTML = wins;
                    hangMan();
                }

            }
        }
    }