import React from "react";
import { useState } from "react";

const UseStateComponent = () => {
  //storing the state in avariable
  // const counter = useState(0)// provide inistal value we wan to store
  // console.log(counter);// we will see a array and inside we will see initial value and function seperatly and we can asses
  //  thefirst array with imdex 0 and 1 precisely
  // const counter = useState(0)[0];
  // const setCounter = useState(0)[1];
  // console.log(counter);
  // console.log(setCounter);

  const [counter, setCounter] = useState(10);
  // counter is used to store the variable while setCounter is used to render or update the variable
  console.log(counter);

  const [color, setColor] = useState("red");

  // let color = "red";
  // const changeColor = () => {
  //   color = "Blue"; THIS IS NOT ENDERING
  //   console.log(color);
  // };
  const changeColor = () => {
    setColor("Blue");
  };
  return (
    <>
      {/* <h1>My favorite color is Red!</h1>this first */}
      <h1>My favorite color is {color}!</h1>
      <button onClick={changeColor}>Blue</button>
    </>
  );
};

export default UseStateComponent;
