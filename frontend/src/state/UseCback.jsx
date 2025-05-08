import React,{useState} from 'react'
import Header from './Header'

const UseCback = () => {

    const [count,setCount] = useState(0)
  return (
    <>
   <Header/>
   <h1>{count}</h1>
<button onClick={()=>setCount(prev=>prev+1)}>Click here</button>
   </>
  )
}

export default UseCback