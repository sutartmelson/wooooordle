import React, {Component} from 'react';
import { STATE } from './constants';

class GameTile extends Component {
    render() {
        let className;
        if (this.props.state === STATE.PRESENT) {
            // Yellow
            className = 'tile present';
        } else if (this.props.state === STATE.CORRECT) {
            // Green
            className = 'tile correct';
        } else if (this.props.state === STATE.ABSENT) {
            // Gray
            className = 'tile absent';
        } else {
            // Default
            className = 'tile';
        }
        return (
            <div className={className}>{this.props.letter}</div>
        );
    }
}

export default GameTile