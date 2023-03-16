import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Gameboard from "./components/Gameboard";
import React, { useEffect, useState } from "react";
import m1 from "./assets/monkey1.jpg";
import m2 from "./assets/monkey2.jpg";
import m3 from "./assets/monkey3.jpeg";
import m4 from "./assets/monkey4.jpeg";
// up to 16 monkeys

const pics = [m1, m2, m3, m4];

// create reset function

function App() {
  // initialize size state first
  let [size, setSize] = useState(4);
    // shuffle function
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }
    // create random monkey array based on size variable
    function getMonkes() {
      let monkey_start = Array.from(Array(size).keys());
      monkey_start = monkey_start.map((i) => {
        return {
          disabled: false,
          url: pics[Math.floor(i / 2)],
          flipped: 1,
          index: i,
          key: i.toString(),
        };
      });
  
      monkey_start = shuffle(monkey_start);
      for (let i = 0; i < monkey_start.length; i++) {
        monkey_start[i].key = i.toString();
        monkey_start[i].index = i;
      }
      return monkey_start;
    }

  // initialize state
  let [monkes, setMonkes] = useState(getMonkes());
  let [bscore, setBScore] = useState(0);
  let [cscore, setCScore] = useState(0);
  let [mcount, setMCount] = useState(0);
  let [currentMonke, setCurrentMonke] = useState(null);
  let [round, setRound] = useState(0);

 
  // update monkes, mcount, currentMonke, and round when size changes
  useEffect(() => {
    setMonkes(getMonkes());
    setMCount(0);
    setCurrentMonke(null);
    setRound(round + 1);
  }, [size]);

  // make a function that flips all cards down 3 seconds after round starts
  useEffect(() => {
    setTimeout(() => {
      let newMonkes = [...monkes];
      for (let i = 0; i < newMonkes.length; i++) {
        newMonkes[i].flipped = 0;
      }
      setMonkes(newMonkes);
    }, 3000);
  }, [round]);


  // win condition function
  function checkWin() {
    if (mcount >= size / 2) {
      alert("You win!");
      setSize(size * 2);
    }
  }

  useEffect(() => {
    if (bscore < cscore) {
      setBScore(cscore);
    }
  }, [cscore]);

  useEffect(() => {
    setCScore(cscore + 1);
    checkWin();
  }, [mcount]);

  // flip function
  function flip(e) {
    let i = parseInt(e.target.id);
    let newMonkes = [...monkes];
    newMonkes[i].flipped = 1;
    setMonkes(newMonkes);

    // check if currentMonke is null
    if (currentMonke === null) {
      setCurrentMonke(newMonkes[i]);
      return;
    } 
  
    // check if currentMonke is the same as the newMonke
    if (currentMonke.disabled || monkes[i].disabled || currentMonke.key === newMonkes[i].key){
      setCurrentMonke(null);
      return; // check if they have been clicked
    }

    // check if there is a match
    if (currentMonke.url === newMonkes[i].url) {// match
      newMonkes = match(i, newMonkes);
    } else { // no match
      setCScore(cscore - 1);
      setTimeout(() => {
        console.log('bananna')
        newMonkes[i].flipped = 0;
        newMonkes[currentMonke.index].flipped = 0;
        setCurrentMonke(null);
        setMonkes(newMonkes);
      }, 500);
      return -1;
    }
    setCurrentMonke(null);
    setMonkes(newMonkes);
    return 0;
  }

  // matching function
  function match(i, newMonkes) {
    newMonkes[i].disabled = true;
    newMonkes[currentMonke.key].disabled = true;
    setMCount(mcount + 1);
    return newMonkes;
  }


  return (
    <div className="App">
      <Scoreboard round={round} cscore={cscore} bscore={bscore}></Scoreboard>
      <Gameboard monkes={monkes} onClick={flip}></Gameboard>
    </div>
  );
}

export default App;
