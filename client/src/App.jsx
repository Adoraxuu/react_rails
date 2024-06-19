import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from "./components/AppRoutes";
import NavBar from './components/NavBar';

import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="app">
        <h1>React on Rails</h1>
        <p>Find this application layout in client/src/App.jsx</p>
        <NavBar />
        <AppRoutes />
      </div>    
    </Router>
  )
}

export default App;
