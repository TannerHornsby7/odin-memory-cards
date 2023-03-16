import '../styles/Scoreboard.css'
import React from 'react'

export default function Scoreboard(props) {
    let timer = <p className="scoreboard__round__score">{props.timer}</p>;
    if(props.timer === 0) {
        timer = <p className="scoreboard__round__score">MATCH!</p>;
    }
        
    return (
        <div className="scoreboard">
        <div className="scoreboard__player">
            <p className="scoreboard__player__name">Score</p>
            <p className="scoreboard__player__score">{props.cscore}</p>
        </div>
        <div className="scoreboard__round">
            <p className="scoreboard__round__name">Round</p>
            <p className="scoreboard__round__score">{props.round}</p>
            {timer}
        </div>
        <div className="scoreboard__player">
            <p className="scoreboard__player__name">Best Score</p>
            <p className="scoreboard__player__score">{props.bscore}</p>
        </div>
        </div>
    );
}