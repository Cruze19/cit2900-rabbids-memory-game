'use strict'; // Strict Mode requirment

// Import canvas animation module from canvas.js
import { initCanvasAnimation } from './canvas.js';

// JSON data & game state object: images, names, and unique identifiers for each card
const cardDataJSON = [
    { id: 1, name: "Raddid 1", img: "images/rabbids/rabbid1.png" },
    { id: 2, name: "Raddid 2", img: "images/rabbids/rabbid2.png" },
    { id: 3, name: "Raddid 3", img: "images/rabbids/rabbid3.png" },
    { id: 4, name: "raddid 4", img: "images/rabbids/rabbid4.png" },
    { id: 5, name: "Raddid 5", img: "images/rabbids/rabbid5.png" },
    { id: 6, name: "Raddid 6", img: "images/rabbids/rabbid6.png" },
    { id: 7, name: "Raddid 7", img: "images/rabbids/rabbid7.png" },
    { id: 8, name: "raddid 8", img: "images/rabbids/rabbid8.png" },
    { id: 9, name: "Raddid 9", img: "images/rabbids/rabbid9.png" },
    { id: 10, name: "Raddid 10", img: "images/rabbids/rabbid10.png" },
    { id: 11, name: "Raddid 11", img: "images/rabbids/rabbid11.png" },
    { id: 12, name: "raddid 12", img: "images/rabbids/rabbid12.png" },
    { id: 13, name: "Raddid 13", img: "images/rabbids/rabbid13.png" },
    { id: 14, name: "Raddid 14", img: "images/rabbids/rabbid14.png" },
    { id: 15, name: "Rabbid 15", img: "images/rabbids/rabbid15.png" }
];

// Game state object to track the current game status
const gameState = {
    score: 0,
    timer: 0,
    timerInterval: null,
    matchedPair: 0,
    cards: [],
    flippedCards: [],
    isLocked: false
};

/*
    Promises Requirement
    Wrap embedded JSON data in a Promise
*/
function loadCardData() {
    return new Promise((resolve) => {
        // Decision Point: Simulate asynchronous loading using a Promise
        setTimeout(() => {
            resolve(cardDataJSON);
        }, 100);
    });
}

/**
 * Game Logic & Functions
 * Initialize and starts a new game session.
 */
async function initializeGame() {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // Clear existing cards from the board
    
    // Reset game state variables
    gameState.score = 0;
    gameState.matchedPair = 0;
    gameState.timer = 0; 
    updateScoreDisplay();

    // Reset and start timer interval
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        document.getElementById('timer').textContent = gameState.timer;
    }, 1000);

    try {
        // Await the Promise to resolve the embedded JSON data
        const rawData = await loadCardData();

        // Duplicate and shuffle the card array using loop
        gameState.cards = duplicateAndShuffleCards(rawData);

        // Loop through cards array to create card elements into the DOM
        gameState.cards.forEach((cardData, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = cardData.name;
            cardElement.dataset.index = index;
            cardElement.textContent = '?'; // Placeholder for card back

            // Event listener for user click to flip the card
            cardElement.addEventListener('click', () => handleCardClick(cardElement, cardData));
            board.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Error starting the game:', error);
    }
}

/**
 * Duplicates base cards and performs Fisher-Yates array 
   shuffling loop.
 */
function duplicateAndShuffleCards(baseCards) {
    // Duplicate the array
    const duplicated = [...baseCards, ...baseCards];

    // Loop through array elements in reverse order to shuffle
    for (let i = duplicated.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap array elements using destructuring assignment
        [duplicated[i], duplicated[j]] = [duplicated[j], duplicated[i]];
    }

    return duplicated;
}

/*
    Event handlers for card elements.
 */
function handleCardClick(element, data) {
    // Decision Point: Ignore clicks if the gameboard is locked or the card is already flipped/matched
    if (gameState.isLocked || element.classList.contains('flipped') || element.classList.contains('matched')) {
        return;
    }

    // Reveal card image on web page
    element.classList.add('flipped');
    element.innerHTML = `<img src="${data.img}" alt="${data.name}">`;
    gameState.flippedCards.push({ element, data });

    // Decision Point: Check match logic when two cards are selected
    if (gameState.flippedCards.length === 2) {
        checkForMatch();
    }
}

/*
    Compares two selected cards using conditional logic.
*/
function checkForMatch() {
    const [card1, card2] = gameState.flippedCards;

    // Decision Point: Evaluate if both flipped cards have matching names
    if (card1.data.name === card2.data.name) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        // Update game state for matched pair and score
        gameState.score += 10;
        gameState.matchedPair++;
        gameState.flippedCards = []; 
        updateScoreDisplay();

        // Decision Point: check Win condition if all pairs are matched
        if (gameState.matchedPair === gameState.cards.length / 2) {
            clearInterval(gameState.timerInterval);
            setTimeout(() => alert(`BWAAAH! You won in ${gameState.timer} seconds! 🏆 ( •̀ ω •́ )✧`), 300);
        }
    } else {
        // Cards do not match: lock board and hide cards after delay
        gameState.isLocked = true;
        setTimeout(() => {
            card1.element.classList.remove('flipped');
            card1.element.textContent = '?';
            card2.element.classList.remove('flipped');
            card2.element.textContent = '?';
            gameState.flippedCards = [];
            gameState.isLocked = false;
        }, 1000);
    }
}

/*
    Updates score element rendered on web page.
*/
function updateScoreDisplay() {
    document.getElementById('score').textContent = gameState.score;
}

// Event listeners & initialization
document.addEventListener('DOMContentLoaded', () => {
    // Start Canvas visual rendering and animation from canvas.js module
    initCanvasAnimation();

    // Event listener for Start Game button press (Matches button ID in index.html)
    const startBtn = document.getElementById('start-button');
    if (startBtn) {
        startBtn.addEventListener('click', initializeGame);
    }
});