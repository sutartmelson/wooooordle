import React, {Component} from 'react';
import GameWord from './GameWord';

class GameBoard extends Component {

    render() {
        let gameData = this.props.gameData;
        let gameBoard = [];

        for (let i = 0; i < gameData.length; i++) {
            const word = gameData[i];
            gameBoard.push(<GameWord
                key={`row-${i}`}
                row={i}
                wordData={word}>
                </GameWord>);            
            
        }

        return (
            <div className='game-board-wrapper'>
                <div className='game-board'>
                    {gameBoard}
                </div>
            </div>
        )
    }
}

export default GameBoard;