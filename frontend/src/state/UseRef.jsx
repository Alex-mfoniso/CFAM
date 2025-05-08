import React, { useEffect, useRef, useState } from "react";

const UseRef = () => {
  const [value, setValue] = useState(0);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setCount((prev) => prev + 1);
//   },[]);

const count = useRef(0)
console.log(count);
useEffect(()=>{
    count.current =count.current+1
})

  return (
    <>
      <button
        onClick={() => {
          setValue((prev) => prev - 1);
        }}
      >
        -1
      </button>
      <h1>{value}</h1>
      <button
        onClick={() => {
          setValue((prev) => prev + 1);
        }}
      >
        +1
      </button>

      {/* let display count that will handle hw many times the component is render */}
      {/* <h1>Render Count: {count}</h1> */}
      <h1>Render Count: {count.current}</h1>
      {/* now we will have to increase the count whenever the component is render */}
    </>
  );
};

export default UseRef;
