import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <Router>
      <div className="container">
        <Toaster position='bottom-right' />
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
