import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useMemo } from 'react'
import { useCallback } from 'react'

const sqNum=function(num){
  console.log('Calculation.........')
  for(let i =0;i<5000000;i++){}
  return num*num
}
const Child = React.memo(function  Child({onClick}){
  console.log('Child Runs.........')

  return(
    <button onClick={onClick}>Click</button>
  )
})



function App() {
  const [count, setCount] = useState(0)
  const [number,setNumber]=useState(2)

  const sq=useMemo(()=>{
    return sqNum(number);
  },[number])

  const  handleClick= useCallback(()=>{
    setCount(c=>c+1)
  },[])


  return (
    <>
      <Child onClick={handleClick}/>
      <p>Counter {count}</p>
      <button onClick={()=>setCount(count+1)}>++</button>

      <p>Sq {sq}</p>
      <input type="text" onChange={(e)=>setNumber(e.target.value)} />

    </>
  )
}

export default App
