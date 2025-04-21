import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Landing from './pages/Landing';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import OAuthCallback from './pages/OauthCallback';
function App() {

  return (
    <Router>
      <div className="container">
        <Toaster position='bottom-right' />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={ <Login /> } />
          <Route path='/oauth-callback' element={ <OAuthCallback />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
