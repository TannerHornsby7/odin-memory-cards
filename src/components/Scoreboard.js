import '../styles/Scoreboard.css'
import React from 'react'

export default function Scoreboard(props) {
    return (
        <div className="scoreboard">
        <div className="scoreboard__player">
            <p className="scoreboard__player__name">Score</p>
            <p className="scoreboard__player__score">{props.cscore}</p>
        </div>
        <div className="scoreboard__round">
            <p className="scoreboard__round__name">Round</p>
            <p className="scoreboard__round__score">{props.round}</p>
        </div>
        <div className="scoreboard__player">
            <p className="scoreboard__player__name">Best Score</p>
            <p className="scoreboard__player__score">{props.bscore}</p>
        </div>
        </div>
    );
}