import React, {Component} from 'react';
import GameTile from './GameTile';

class GameWord extends Component {

    render() {
        let wordData = this.props.wordData;
        let gameWord = [];
        for (let i = 0; i < wordData.length; i++) {
            gameWord.push(<GameTile
                            key={`row-${this.props.word}-letter-${i}`}
                            letter={wordData[i].letter}
                            state={wordData[i].state}>
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