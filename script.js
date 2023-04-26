document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById("game-board");

    const cards = [
        "1", "7", "2", "8", "3", "9", "4", "10",
        "5", "11", "6", "12"
    ];
    let openCards = [];
    let matchedPairs = 0;
    let flipInterval;

    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function createCards() {
        shuffle(cards);
        cards.forEach((cardValue, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.backgroundImage = `url('img/${cardValue}.png')`;

            const cardBack = document.createElement("div");
            cardBack.classList.add("card-back");
            card.appendChild(cardBack);

            gameBoard.appendChild(card);
        });
    }

    function disableBoardInteraction() {
        gameBoard.style.pointerEvents = "none";
    }


    function flipCardsAutomatically() {
        const unopenedCards = Array.from(document.querySelectorAll(".card-back:not([style*='display: none'])"));
        if (unopenedCards.length === 0 || matchedPairs === 8) return;

        const randomIndex = Math.floor(Math.random() * unopenedCards.length);
        const cardBack = unopenedCards[randomIndex];
        const card = cardBack.parentElement;
        const cardValue = card.style.backgroundImage.slice(9, -6);
        cardBack.style.display = "none";
        openCards.push({
            card,
            cardValue
        });

        if (openCards.length === 2) {
            setTimeout(() => {
                const cardValues = openCards.map(({ cardValue }) => parseInt(cardValue));
                if (Math.abs(cardValues[0] - cardValues[1]) === 6) {
                    matchedPairs++;

                    if (matchedPairs === 6) {
                        showCongratulationsText();
                    }
                } else {
                    openCards.forEach(({ card }) => {
                        card.querySelector(".card-back").style.display = "block";
                    });
                }
                openCards = [];
                flipCardsAutomatically();
            }, 1000);
        } else {
            flipInterval = setTimeout(flipCardsAutomatically, 1000);
        }
    }

    function showCongratulationsText() {
        disableBoardInteraction();
        
        setTimeout(() => {
            window.location.reload();
        }, 20000);
    }

    createCards();
    flipInterval = setTimeout(flipCardsAutomatically, 1000);
});