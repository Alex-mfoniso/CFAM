import React, { useRef } from 'react'

const UseRef2 = () => {
    const inputElem = useRef()
    const btnClicked =()=>{
        console.log(inputElem.current);
        inputElem.current.style.background = "blue"
        
    }
  return (
   <>
   {/* we can use usefef to access dom element */}

   <input type="text" ref={inputElem}/>
   <button onClick={btnClicked}>Click here</button>
   </>
  )
}

export default UseRef2