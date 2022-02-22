import React, {Component} from 'react';
import GameTile from './GameTile';

class GameWord extends Component {

    render() {
        let wordData = this.props.wordData;
        let gameWord = [];
        for (let i = 0; i < wordData.length; i++) {
            // Add a css transition delay so each tile flips over
            // in sequential order, left to right.
            const delay = 0.25;
            const transitionTime = 0.5;
            const tileStyle = {
                transition: `transform ${transitionTime}s linear ${i*delay}s`
            };
            gameWord.push(<GameTile
                            key={`row-${this.props.word}-letter-${i}`}
                            letter={wordData[i].letter}
                            state={wordData[i].state}
                            style={tileStyle}>
                          </GameTile>);
        }

        return (
            <div className='game-word'>
                {gameWord}
            </div>
        )
    }
}

export default GameWord;