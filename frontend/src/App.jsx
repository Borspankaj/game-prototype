import './App.css'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'   
import Room from './components/Room'
function App() {
  
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/r/:roomId' element={<Room />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
