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

const gameState =  {
    score: 0,
    time: 0,
    timeInterval: null,
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
    const ctx =  canvas.getContext('2d');   // ctx represents the Rendering Context
    
}