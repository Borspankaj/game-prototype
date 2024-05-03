import './App.css'
import Home from './components/Home'
function App() {
  const handlejoin=()=>{
    console.log("Join Game")
  }
  const createGame=()=>{
    console.log("Create Game")
  }
  

  return (
    <>
    <Home />
    <input type="text" placeholder="Enter your name" />

    <input type="text" placeholder="Enter game code" />

    <button onClick={handlejoin}>Join Game</button>
    <button onclick={createGame}>Create Game</button>


  
    </>
  )
}

export default App
