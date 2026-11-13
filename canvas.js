'use strict';

/*
    Canvas Requirement
    Custom animated and transformed graphic
*/
function initCanvasAnimation() {
    const canvas = document.getElementById('rabbidCanvas');
    const context = canvas.getContext('2d'); 
    
    let xPos = 100; // create moving position variable for the text
    let direction = 2; // control speed and direction of the text movement

    function animate() {
        // Clear canvas frame
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Save Canvas state before transformation
        context.save();

        // Apply translation and scaling transformations
        context.translate(xPos, 50);
        context.scale(1.1, 1.1);

        // Draw custom graphic banner
        context.fillStyle = '#d32f2f';
        context.fillRect(-50, -20, 100, 40);

        // Draw text onto canvas
        context.fillStyle = '#ffffff';
        context.font = 'bold 16px Arial';
        context.fillText('BWAAAH!', -35, 6);

        // Restore canvas state
        context.restore();

        // Decision Point: Reverse direction if text hits borders
        if (xPos > 340 || xPos < 60) {
            direction = -direction;
        }

        // Update position for next frame and request next animation frame
        xPos += direction;
        requestAnimationFrame(animate);
    }

    animate();
}
export default GameGrid;