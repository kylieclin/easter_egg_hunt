$(document).ready(startApp);

var newGame;

function startApp(){
    var easterCardsPackage ={
        front:  ['images/blue.jpg', 'images/dotbee.jpg', 'images/dots.jpg', 'images/dotline.jpg', 'images/lines.jpg', 'images/square.jpg', 'images/stars.jpg', 'images/xmas.jpg', 'images/yellow.jpg'],
        back: 'images/grass.jpg'
    };
    newGame = new MemoryMatchGame(easterCardsPackage);
    newGame.add_eventListener();
}