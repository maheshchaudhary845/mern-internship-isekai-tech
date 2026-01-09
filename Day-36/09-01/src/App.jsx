import { useReducer } from "react"

function appReducer(prevState, action) {
  switch (action.type) {
    case "inc":
      return { ...prevState, count: prevState.count + 1 }
    case "dec":
      return { ...prevState, count: prevState.count - 1 }
    case "themeToggle":
      return { ...prevState, theme: prevState.theme == "dark" ? "light" : "dark" }
  }
}
const initValue = {
  count: 0,
  theme: "dark",
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initValue);

  return (
    <>
      <div className="container" style={{
        width: "100%",
        height: "100vh",
        backgroundColor: state.theme == "dark" ? "#000" : "#fff",
        color: state.theme == "dark" ? "#fff" : "#000",
      }}>
        <button onClick={()=> dispatch({type: "dec"})}>-</button>
        <span>{state.count}</span>
        <button onClick={()=> dispatch({type: "inc"})}>+</button>
        <br />
        <button onClick={()=> dispatch({type: "themeToggle"})}>Toggle Theme</button>
      </div>
    </>
  )
}

export default App;