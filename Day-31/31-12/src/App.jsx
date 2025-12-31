import { useEffect, useState } from 'react'
import './App.css'

function App() {
  let [a, setA] = useState(0);
  // a = a + 1;
  // console.log(a);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [form, setForm] = useState({firstName: "", lastName: "", phone: "", address: ""});

  function handleForm(e){
    const {name, value}= e.target;
    console.log({...form})
    setForm({...form, [name]: value});
  }

  // useEffect(()=>{
    document.body.style.backgroundColor = color;
  // }, []);

  return (
    <>
      {/* <h1>Hello World</h1>
      <div>Count: {a}</div>
      <button onClick={() => {setA(a+1); console.log(a)}}>Increment</button>
      <button onClick={() => {
        if(a>0){
          setA(a-1);
        }
        console.log(a)
        }}>Decrement</button> */}
        <h1 style={{color: color}}>Practice on useState hook</h1>
        <input type="text" placeholder='Enter your name' value={name} onChange={(e)=> setName(e.target.value)} />
        <input type="number" placeholder='Enter your age' value={age} onChange={(e)=> setAge(e.target.value)} />
        <div>Your name is {name} and your age is {age}</div>

        <input type="text" placeholder='Enter the bg color of body' value={color} onChange={(e)=> setColor(e.target.value)} />

        <form action="">
          <input type="text" name='firstName' placeholder='First name' value={form.firstName} onChange={(e)=> handleForm(e)} />
          <input type="text" name='lastName' placeholder='Last name' value={form.lastName} onChange={handleForm} />
          <input type="phone" name='phone' placeholder='Phone number' value={form.phone} onChange={handleForm} />
          <input type="text" name='address' placeholder='Address' value={form.address} onChange={handleForm} />
          <div>First Name: {form.firstName}</div>
          <div>Last Name: {form.lastName}</div>
          <div>Phone Number: {form.phone}</div>
          <div>Address: {form.address}</div>
        </form>
    </>
  )
}

export default App