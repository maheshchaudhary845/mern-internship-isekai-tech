import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useSelector,useDispatch} from 'react-redux'
import { dec, inc } from './features/counterSlice'

function App() {
  const value =useSelector(state=>state.counter.value)
  const dispatch=useDispatch()
  return (
    <>
      <p>{value}</p>
      <button onClick={()=>dispatch(inc())}>+</button>
      <button onClick={()=>dispatch(dec())}>-</button>
    </>
  )
}

export default App
