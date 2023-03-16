import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Gameboard from "./components/Gameboard";
import React, { useEffect, useState } from "react";
import m1 from "./assets/monkey1.jpg";
import m2 from "./assets/monkey2.jpg";
import m3 from "./assets/monkey3.jpeg";
import m4 from "./assets/monkey4.jpeg";

const pics = [m1, m2, m3, m4];
let SIZE = 4;

// create win function
// create reset function

function App() {
  let hm = {};
  // create random monkey array based on SIZE variable
  let monkey_start = Array.from(Array(SIZE).keys()).map((i) => {
    return { url: pics[Math.floor(i / 2)], flipped: 0, key: i };
  });
  // set hashmap
  console.log(monkey_start);
  let [monkes, setMonkes] = useState(monkey_start);
  let [bestScore, setBestScore] = useState(0);
  let [currentMonke, setCurrentMonke] = useState(null);
  // when we call setBestScore, we also reset monkes, doubling the number of monkes

  const shuffle = (array) => {
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
  };
  function flip(e) {
    console.log();
    return 0;
  }
  // const flip = (index) => {
  //   let newMonkes = [...monkes];
  //   newMonkes[index].flipped = 1;
  //   setMonkes(newMonkes);
  //   if (currentMonke === null) {
  //     setCurrentMonke(newMonkes[index]);
  //   } else {
  //     if (currentMonke.url === newMonkes[index].url) {
  //       console.log('match');
  //       setCurrentMonke(null);
  //     } else {
  //       console.log('no match');
  //       setTimeout(() => {
  //         newMonkes[index].flipped = 0;
  //         newMonkes[currentMonke.key].flipped = 0;
  //         setMonkes(newMonkes);
  //         setCurrentMonke(null);
  //       }, 1000);
  //     }
  //   }
  // }

  useEffect(() => {
    setMonkes(shuffle(monkes));
  }, []);

  return (
    <div className="App">
      <Scoreboard></Scoreboard>
      <Gameboard monkes={monkes} onClick={flip}></Gameboard>
    </div>
  );
}

export default App;
