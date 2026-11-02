'use strict'; // Strict Mode requirment

// JSON data & game state object
const cardDataJSON = [
    { id: 1, name: "Raddid 1", image: "images/rabbids/rabbid1.png" },
    { id: 2, name: "Raddid 2", image: "images/rabbids/raddid2.png" },
    { id: 3, name: "Raddid 3", image: "images/rabbids/raddid3.png" },
    { id: 4, name: "raddid 4", image: "images/rabbids/raddid4.png" },
    { id: 5, name: "Raddid 5", image: "images/rabbids/rabbid5.png" },
    { id: 6, name: "Raddid 6", image: "images/rabbids/raddid6.png" },
    { id: 7, name: "Raddid 7", image: "images/rabbids/raddid7.png" },
    { id: 8, name: "raddid 8", image: "images/rabbids/raddid8.png" },
    { id: 9, name: "Raddid 9", image: "images/rabbids/rabbid9.png" },
    { id: 10, name: "Raddid 10", image: "images/rabbids/raddid10.png" },
    { id: 11, name: "Raddid 11", image: "images/rabbids/raddid11.png" },
    { id: 12, name: "raddid 12", image: "images/rabbids/raddid12.png" },
    { id: 13, name: "Raddid 13", image: "images/rabbids/rabbid13.png" },
    { id: 14, name: "Raddid 14", image: "images/rabbids/raddid14.png" },
    { id: 15, name: "Rabbid 15", image: "images/rabbids/rabbid15.png" }];

// Game state object to track the current game status
const gameState =  {
    score: 0,
    timer: 0,
    timerInterval: null,
    matchedPair: 0,
    cards: [],
    flipedCards: [],
    isLocked: false
};

/*
    Promises Requirement
    Wrap emebedded JSON data in a Promises
*/
 function loadCardData() {
    return new Promise((resolve) =>  {
        // Descision Point: Simulate asynchronous loading using a Promise
        setTimeout(() => {
            resolve(cardDataJSON);
        }, 100);
    });
 }

 /*
    Canvas Requirement
    Custom animated and tranformed graphic 
 */
function initCanvasAnimation() {
    const canvas = document.getElementById('rabbidCanvas');
    const context =  canvas.getContext('2d'); 
    
    let xPos = 50;
    let direction = 2;

    function animate() {
        // Clear canvas frame
        context.clearRecr(0, 0, canvas.width, canvas.height);

        // Save Canvas state before transformation
        context.save();

        // Apply translation and scaling transformations
        context.translate(xPos, 50);
        context.Scale(1.1, 1.1);

        // Draw custom graphic banner
        context.fillStyle = '#d32f2f';
        context.fillReact(-50, -20, 100, 40);

        // Draw text onto canvas
        context.fillStyle = '#ffffff';
        context.font = 'bold 16px Arial';
        context.fillText('BWAAAH!', -35, 6);

        // Restore canvas state
        context.restore();

        // Decision Point: Reverse direction if text hit boarders
        if (xPos > 340 || xPos < 60) {
            direction = -direction;
        }

        // Update position for next frame and request next animation frame
        xPos += direction;
        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Game Logic & Functions
 * Initialize and starts a new game session.
 */
async function initializeGame() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    
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
        // Await the Promise to resolves the embedded JSON data
        rawDATA = await loadCardData();

        // Duplicate and shuffle the card array using loop
        gameState.cards = duplicateAndShuffleCards(rawData);

        // Loop through cards array to create card elements into the DOM(Document Object Model)
        gameState.cards.forEach((cardData, index) => {
            const cardElement = domcument.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = cardData.name;
            cardElement.dataset.index = index;
            cardElement.textContent = '?'; // Placeholder for card back

            // Event listener for user click to flip the card
            cardElement.addEventListener('click', () => handleCardClick(cardElement, cardData));
            board.appendChild(cardElement);
        });
    }catch (error) {
        console.error('Error starting the game:', error);
    }

}