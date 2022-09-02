const cc = require('./crossClues.js')

const startGame = function(gameType) {
    switch(gameType){
        case 'cross_clues':
            var selectedWord = cc.selectWords();
            var guessStack = cc.createGuessStack();
            // the app send a gamedata control message with json data to start the game
    }
}

module.exports ={
    startGame
}