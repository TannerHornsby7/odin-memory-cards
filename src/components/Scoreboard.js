import '../styles/Scoreboard.css'
import React from 'react'

export default function Scoreboard(props) {
    return (
        <div className="scoreboard">
        <div className="scoreboard__player">
            <p className="scoreboard__player__name">Player 1</p>
            <p className="scoreboard__player__score">{props.cscore}</p>
        </div>
        <div className="scoreboard__player">
            <p className="scoreboard__player__name">Best Score</p>
            <p className="scoreboard__player__score">{props.bscore}</p>
        </div>
        </div>
    );
}