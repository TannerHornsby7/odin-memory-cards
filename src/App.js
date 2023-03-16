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

// create win function
// create reset function

function App() {
  let [size, setSize] = useState(8);

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
  function getMonkes(){
    let monkey_start = Array.from(Array(size).keys());
    monkey_start = monkey_start.map((i) => {
      return { url: pics[Math.floor(i / 2)], flipped: 0, index: i, key: i.toString() };
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

  // peek function helpers
  function flip_up(){
    let newMonkes = [...monkes];
    for (let i = 0; i < newMonkes.length; i++) {
      newMonkes[i].flipped = 1;
    }
    setMonkes(newMonkes);
  }
  function flip_down(){
    let newMonkes = [...monkes];
    for (let i = 0; i < newMonkes.length; i++) {
      newMonkes[i].flipped = 0;
    }
    setMonkes(newMonkes);
  }
  // peek function
  function peek(){
    flip_up();
    setTimeout(() => {
      flip_down();
    }, 5000);
  }
  // when we call setBestScore, we also reset monkes, doubling the number of monkes

  // mount timer for looking at monkeys for 5 seconds after 1 second
  useEffect(() => {

    setTimeout(() => {
      peek(monkes);
    }, 100);
  }, []);

  function flip(e) {
    let i = parseInt(e.target.id);
    let newMonkes = [...monkes];
    newMonkes[i].flipped = 1;
    setMonkes(newMonkes);
    if (currentMonke === null) {
      setCurrentMonke(newMonkes[i]);
    } 
    else {
      if (currentMonke.url === newMonkes[i].url && currentMonke.key !== newMonkes[i].key) {
        console.log('match');
        console.log(mcount);
        setCScore(cscore + 1);
        if(mcount + 1 === size / 2) {
          alert('you win');
          setMCount(0);
          setBScore(cscore);
          setSize(size * 2)
          setMonkes(null);
          setMonkes(getMonkes());
          
        }
        setMCount(mcount + 1);
        setCurrentMonke(null);
      } else {
        console.log('no match');
        setCScore(cscore - 1);
        setTimeout(() => {
          newMonkes[i].flipped = 0;
          newMonkes[currentMonke.key].flipped = 0;
          setMonkes(newMonkes);
          setCurrentMonke(null);
        }, 1000);
      }
    }
    return 0;
  }

  return (
    <div className="App">
      <Scoreboard cscore={cscore} bscore={bscore}></Scoreboard>
      <Gameboard monkes={monkes} onClick={flip}></Gameboard>
    </div>
  );
}

export default App;
