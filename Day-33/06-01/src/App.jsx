import { useState } from 'react'
import './App.css'
import { useRef } from 'react'
import { useEffect } from 'react'
import User from './components/User';

function App() {
  // const inputRef = useRef(null);
  // // const previousRef=useRef("")
  // const [text,setText]=useState('')

  // function handleInput(e){
  //   e.preventDefault();
  //   // console.log(inputRef.current.value);
  //   setText(inputRef.current.value)
  //   // previousRef.current=inputRef.current.value
  // }

  const [counter, setCounter] = useState(0);
  const pre = useRef();

  useEffect(() => {
    pre.current = counter;
  }, [counter])

  const prevCount = pre.current;

  return (
    <>
    <User />
      {/* <form action=""> */}
      {/* <input type="text" placeholder='Enter your Name' ref={inputRef} /> */}
      {/* <input type="number" placeholder='Enter your Age' ref={inputRef} /> */}
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      {/* </form> */}

      <div className="output">current value: {counter}</div>
      <div className="output">previous value: {prevCount !== undefined ? prevCount : "Not Initialized"}</div>
    </>
  )
}

export default App
