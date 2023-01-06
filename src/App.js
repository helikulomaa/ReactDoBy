import './App.css';
import React, {useState, useEffect} from 'react'
import TaskList from './TaskList';
import Message from './Message'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {

  const [showMessage, setShowMessage] = useState('')
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)

  return (
    <div className="App">
    <Router>

    <Navbar bg="dark" variant="dark">
      <Nav className='mr-auto'>
        <Link to={'/Tasks'} className="nav-link">Tehtävät</Link>
        <button>Kirjaudu ulos</button>
      </Nav>

    </Navbar>

  <h1>Minun tehtäväni</h1>

  {showMessage && <Message message={message} isPositive={isPositive} /> }

    <TaskList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>

  </Router>

    </div>
  );
}

export default App;
