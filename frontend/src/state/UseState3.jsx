import React, { useState } from "react";

const UseState3 = () => {
  const [count, setCount] = useState(0);
  const increaseCount = ()=>{
    setCount(count+4)
    // setCount(count+1)
    // setCount(count+1)
    // setCount(count+1)
  }
  return (
    <>
      <h1>Count:{count}</h1>
      <button onClick={increaseCount}>increase</button>
    </>
  );
};

export default UseState3;
