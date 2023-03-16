import "../styles/Gameboard.css";
import React, { Component } from "react";
import munky from '../assets/munky.svg'

// create square component that holds image
// create gameboard component that holds squares


function Square(props) {
  let img = <img className="square__img" src={props.pic} id={props.index.toString()} />
  let back = <div className="square__back" id={props.index.toString()}>
    <img className="square__back__img" src={munky} id={props.index.toString()} />
  </div>
    return (
        <button className="square" onClick={props.flip} id={props.index.toString()}>
        {props.flipped ? img : back}
        </button>
    );
}

export default function Gameboard(props) {

  function renderSquare(monke) {
    return (
      <Square
        flipped={monke.flipped}
        flip={props.onClick}
        pic={monke.url}
        index={monke.index}
        key={monke.key}
      />
    );
  };
  let board = [];
  board = props.monkes.map((monke) => {
    return renderSquare(monke);
  });

  return <div className="gameboard">{board}</div>;
}
