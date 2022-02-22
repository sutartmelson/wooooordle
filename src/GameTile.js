import React, {Component} from 'react';
import { STATE } from './constants';

class GameTile extends Component {
    
    render() {
        let className;
        let innerClassName;
        if (this.props.state === STATE.PRESENT) {
            // Yellow
            className = 'tile present';
            innerClassName = 'rotate';
        } else if (this.props.state === STATE.CORRECT) {
            // Green
            className = 'tile correct';
            innerClassName = 'rotate';
        } else if (this.props.state === STATE.ABSENT) {
            // Gray
            className = 'tile absent';
            innerClassName = 'rotate';
        } else {
            // Default
            className = 'tile normal';
            innerClassName = '';
        }
        return (
            <div className={className} style={this.props.style}>
                <div className={innerClassName}
                     style={this.props.style}>
                    {this.props.letter}
                </div>
            </div>
        );
    }
}

export default GameTile