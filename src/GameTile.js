import React, {Component} from 'react';
import { DEFAULT_TILE, STATE } from './constants';

class GameTile extends Component {
    
    render() {
        let backClassName;
        let frontClassName = 'front used';
        if (this.props.state === STATE.PRESENT) {
            // Yellow
            backClassName = 'back present';
        } else if (this.props.state === STATE.CORRECT) {
            // Green
            backClassName = 'back correct';
        } else if (this.props.state === STATE.ABSENT) {
            // Gray
            backClassName = 'back absent';
        } else {
            // Default
            // Letter has not yet been validated
            backClassName = 'back';
            if (this.props.letter === DEFAULT_TILE) {
                frontClassName = 'front';
            }
        }
        return (
            <div className='tile'>
                <div className='tile-inner'>
                    <div className={frontClassName}>
                        {this.props.letter}
                    </div>
                    <div className={backClassName}
                         style={this.props.style}>
                        {this.props.letter}
                    </div>
                </div>
            </div>
        );
    }
}

export default GameTile