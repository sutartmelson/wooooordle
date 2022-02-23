import React, {Component} from 'react';
import { ALPHABET, SPECIAL_KEYS, STATE } from './constants';

class GameKeyboard extends Component {
    constructor(props) {
        super(props);
        this.keyboard = [['q','w','e','r','t','y','u','i','o','p'],
                         ['a','s','d','f','g','h','j','k','l'],
                         ['z','x','c','v','b','n','m']];
        this.onLetterClick = this.onLetterClick.bind(this);
        this.pressKey = this.pressKey.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if (event.repeat) {
            return;
        }
        if (ALPHABET.find((e) => e===event.key)) {
            this.pressKey(event.key);
        } else if(event.key === "Enter") {
            this.pressKey(SPECIAL_KEYS.ENTER);
        } else if(event.key === "Backspace") {
            this.pressKey(SPECIAL_KEYS.BACKSPACE);
        }
    }

    onLetterClick(event) {
        this.pressKey(event.target.dataset['key']);
    }

    pressKey(key) {
        this.props.onLetterClick(key);
    }

    render() {
        return (
            <div className='game-keyboard-wrapper'>
                <div className='game-keyboard'>
                    {/* First Row */}
                    <div className='row'>
                        {this.mapLettersToButton(this.keyboard[0])}
                    </div>
                    {/* Second Row */}
                    <div className='row'>
                        <div className='spacer-half'></div>
                        {this.mapLettersToButton(this.keyboard[1])}
                        <div className='spacer-half'></div>
                    </div>
                    {/* Third Row */}
                    <div className='row'>
                        <button data-key={SPECIAL_KEYS.ENTER}
                                className='spacer-three-halves'
                                onClick={this.onLetterClick}>Enter</button>
                        {this.mapLettersToButton(this.keyboard[2])}
                        <button data-key={SPECIAL_KEYS.BACKSPACE}
                                className='spacer-three-halves'
                                onClick={this.onLetterClick}>←</button>
                    </div>
                </div>
            </div>
        );
    }

    mapLettersToButton(letters) {
        return letters.map(letter => {
            let className;
            if (this.props.keyboardColors[letter] === STATE.PRESENT) {
                // Yellow
                className = 'present';
            } else if (this.props.keyboardColors[letter] === STATE.CORRECT) {
                // Green
                className = 'correct';
            } else if (this.props.keyboardColors[letter] === STATE.ABSENT) {
                // Gray
                className = 'absent';
            } else {
                // Default
                className = '';
            }
            return (
                <button
                    className={className}
                    key={letter}
                    data-key={letter}
                    onClick={this.onLetterClick}>
                    {letter}
                </button>
            );
        })
    }
}

export default GameKeyboard