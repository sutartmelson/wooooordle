import React, {Component} from 'react';
import GameBoard from './GameBoard';
import GameKeyboard from './GameKeyboard';
import { WORDS } from './wordlist';
import { SPECIAL_KEYS, STATE, DEFAULT_TILE, ALPHABET } from './constants'

class Game extends Component {

    constructor(props) {
        super(props);
        this.wordLength = 5;
        this.attemptsAllowed = 5;

        this.currentWord = 0;
        this.currentLetter = 0;

        this.lastLetterPopulated = false;

        // Initialize gameboard data
        let gameData = [];
        for (let i = 0; i < this.attemptsAllowed; i++) {
            let word = [];
            for (let j = 0; j < this.wordLength; j++) {
                word.push({ letter: DEFAULT_TILE, state: STATE.STATELESS});
            }
            gameData.push(word);
        }

        // Initialize keyboard color dictionary
        let keyboardColors = Object.assign({}, ...ALPHABET.map(letter => {
            return {[letter]: STATE.DEFAULT_TILE};
        }));

        this.state = { gameData: gameData, keyboardColors: keyboardColors};

        this.WORD = this.pickTodaysWord();

        this.updateCurrentLetter = this.updateCurrentLetter.bind(this);
        this.onLetterClick = this.onLetterClick.bind(this);
        this.backspace = this.backspace.bind(this);
    }
    render() {
        return (
            <div>
                <GameBoard
                    className='game-board'
                    gameData={this.state.gameData}>
                    </GameBoard>
                <GameKeyboard
                    onLetterClick={this.onLetterClick}
                    keyboardColors={this.state.keyboardColors}>
                </GameKeyboard>
            </div>
        );
    }

    onLetterClick(key) {
        if (key === SPECIAL_KEYS.BACKSPACE) {
            this.backspace();
        } else if (key === SPECIAL_KEYS.ENTER) {
            // Validate word.
            if (this.lastLetterPopulated) {
                // Actually validate word
                this.validateWord();
            } else {
                // No enough letters, noop
                return;
            }
        } else {
            if (!this.lastLetterPopulated) {
                this.updateCurrentLetter(key);
                this.advanceCurrentLetter();
            }
        }
    }

    updateCurrentLetter(newLetter) {
        let gameData = this.state.gameData;
        gameData[this.currentWord][this.currentLetter].letter = newLetter;
        this.setState({gameData: gameData});
    }

    advanceCurrentLetter() {
        if (this.currentLetter === this.wordLength -1) {
            // Entered last letter of word, can't advance
            this.lastLetterPopulated = true;
        } else {
            this.currentLetter++;
            this.lastLetterPopulated = false;
        }
    }

    backspace() {
        // If there is a letter at current position, erase it.
        // Otherwise, move back 1 letter and erase it instead.
        let gameData = this.state.gameData;
        // If letter is non empty, erase it and stay on current tile
        if (gameData[this.currentWord][this.currentLetter].letter !== DEFAULT_TILE) {
            this.updateCurrentLetter(DEFAULT_TILE);
        }
        // If letter is empty, move back and delete that instead,
        // unless at start of word
        else if (this.currentLetter !== 0) {
            this.currentLetter--;
            this.updateCurrentLetter(DEFAULT_TILE);
        }
        this.lastLetterPopulated = false;
    }

    pickTodaysWord() {
        return 'speed';
        //return WORDS[94];
    }

    validateWord() {
        let gameData = this.state.gameData;
        let guessedWordData = gameData[this.currentWord];
        let guessedWord = guessedWordData.map(element => element.letter).join('');
        let wordData = this.WORD.split('').map((letter, i) => {
            return {letter: letter, reserved: false};
        });
        // Is guessed word THE word?
        if (guessedWord === this.WORD) {
            guessedWordData.forEach(ld => ld.state = STATE.CORRECT);
        }
        // Is guessed word a real word?
        else if (WORDS.find(validWord => guessedWord === validWord)){
            // Look for greens
            guessedWord.split('').forEach((letter, i) => {
                if (letter === this.WORD[i]) {
                    guessedWordData[i].state = STATE.CORRECT;
                    wordData[i].reserved = true;
                }
            });
            // Look for yellows
            guessedWord.split('').forEach((letter, i) => {
                if (guessedWordData[i].state !== STATE.CORRECT) {
                    for (let j = 0; j < wordData.length; j++) {
                        if (!wordData[j].reserved) {
                            if (letter === wordData[j].letter) {
                                guessedWordData[i].state = STATE.PRESENT;
                                wordData[j].reserved = true;
                                break;
                            }
                        }
                    }
                    if (guessedWordData[i].state !== STATE.PRESENT) {
                        guessedWordData[i].state = STATE.ABSENT;
                    }
                }
            });
        }
        // guessed word is not a real word
        else {
            // Notify user
            return;
        }
        
        // Update keyboard colors
        let newKeyboardColors = this.state.keyboardColors;
        guessedWordData.forEach(guessedLetter => {
            newKeyboardColors[guessedLetter.letter] = guessedLetter.state;
        });

        gameData[this.currentWord] = guessedWordData;
        this.setState({ gameData: gameData, keyboardColors: newKeyboardColors});
        this.advanceToNextWord();
    }

    advanceToNextWord() {
        // Advance to next word
        this.currentWord++;
        this.currentLetter = 0;
        this.lastLetterPopulated = false;
    }
}

export default Game;