import React, { useState,useEffect } from "react";


// to use this hook we have to call two things first
// call back function and dependecy although dependencies are optional 
// let display a counter that tell us hw many time a component is  loaded



const UseEffect = () => {
    const [count, setCount] = useState(0);
    // now let add a timer function that will update the counter value by 1 
    // afer 2 sec
    useEffect(()=>{
        setTimeout(()=>{
            setCount(count => count+1)
        },2000)
    },[count]);

  return (
    <>
      <h1>i've rendered {count} times</h1>
    </>
  );
};

export default UseEffect;
