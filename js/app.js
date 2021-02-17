$(function () {

    // Initialize variables
    var card = $('.card').parent();

    var moves = 0;

    var clickedCardId = 'none',
        clickedCardImg,
        clickedCard;

    var totalPairs = 8;

    // Set functions parameters
    // Flip card
    // Play audio
    card.children().on('click', function () {
        $(this).find('.inner').toggleClass('flipped');
        checkMove($(this).attr('id'), clickedCardId, $(this).find('.image').attr('src'), clickedCardImg, $(this), clickedCard);
        clickedCardImg = $(this).find('.image').attr('src');
        clickedCardId = $(this).attr('id');
        clickedCard = $(this);
        flipAudio();
    });

    var cloned = card.clone(),
        clonedArr = [];

    // Get cards elements to array
    for (var i = 0; i < cloned.length; i++) {
        clonedArr.push(card[i]);
    }

    // Randomize array
    shuffle(clonedArr);

    // Append array content to page
    $.each(clonedArr, function (index, value) {
        $('.game').append(value);
    });

    // FUNCTIONS

    // Randomize array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle
        while (0 !== currentIndex) {

            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function checkMove(currentClick, prevClick, currentCardImg, prevCardImg, currentCard, prevCard) {

        // Max 2 flipped card
        if (currentClick !== prevClick) {
            moves++;
        }
        else {
            if (card.find('.inner').hasClass('flipped')) {
                moves = 1;
            }
            else {
                moves = 0;
            }
        }
        if (moves === 2) {
            if (currentCardImg === prevCardImg) {

                // Check for duplicates
                if (currentClick !== prevClick) {
                    totalPairs--;
                    if (totalPairs === 0) {
                        $('.winner-screen').fadeIn(500);
                        winAudio();
                    }
                    setTimeout(function () {
                        currentCard.fadeOut(500);
                        prevCard.fadeOut(500);
                        moves = 0
                    }, 1000);
                }
            }

            // Hide wrong cards
            else {
                setTimeout(function () {
                    card.find('.inner').removeClass('flipped');
                    moves = 0;
                }, 1000);
            }
        }
    }

    // Audio elements | http://www.soundjay.com/
    function flipAudio() {
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'https://www.soundjay.com/button/button-28.mp3');
        audioElement.play();
    }

    function winAudio() {
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'https://www.soundjay.com/misc/small-bell-ringing-02.mp3');
        audioElement.play();
    }

});