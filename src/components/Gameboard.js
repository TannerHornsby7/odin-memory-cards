import "../styles/Gameboard.css";
import React, { Component } from "react";

// create square component that holds image
// create gameboard component that holds squares

function Square(props) {
    let cover = null;
    if (props.flipped) {
        cover = <div className="cover">MONKE</div>;
    }
    return (
        <button className="square" onClick={props.flip} id={props.key}>
            {cover}
            <img src={props.pic} className="square__img" id={props.key}></img>
        </button>
    );
}

// function Square(props) {
//   let cover = null;
//   if (props.flipped) {
//     cover = <div className="cover">MONKE</div>;
//   }

//   return (
//     <button className="square" onClick={props.flip} id={props.key}>
//       {cover}
//       <img src={props.pic} className="square__img" id={props.key}></img>
//     </button>
//   );
//}

export default function Gameboard(props) {
  const renderSquare = (monke) => {
    console.log('monke url is: ' + monke.url);
    return (
      <Square
        flipped={monke.flipped}
        flip={props.onClick}
        pic={monke.url}
        key='0'
      />
    );
  };
  const board = [];
  for (const monke in props.monkes) {
    board.push(renderSquare(monke));
  }
  return <div className="gameboard">{board}</div>;
}
