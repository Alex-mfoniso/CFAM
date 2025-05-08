import React from "react";
import { useState } from "react";
// multiple state variable
const UseState2 = () => {
  // srore the text in a variable
  // const [brand, setBrand] = useState("Ferrari");
  // const [model, setModel] = useState("Roma");
  // const [year, setYear] = useState("2023");
  // const [color, setColor] = useState("red");
  // but  in this case we declase multiple state variable we can create a state object instead and initialised it with one object so we can store data and key value pair
  const [car, setCar] = useState({
    brand: "Ferrari",
    model: "Roma",
    year: "2023",
    color: "red",
  });


  const changeColor = ()=>{
    // setCar({color:"red"})
    setColor((prev)=>{
      return {...prev, color:"blue"}
    })
  }

  return (
    <>
      {/* <h1>My Ferrari</h1>
    <p>it us from Rome from 2023</p> */}

      {/* <h1>My {brand}</h1>
      <p>it is a {color} {model} from {2023}</p> */}

      <h1>My {car.brand}</h1>
      <p>
        it is a {car.color} {car.model} from {car.year}
      </p>
      {/* to update */}
      <button onClick={changeColor}>Blue</button>
    </>
  );
};

export default UseState2;
