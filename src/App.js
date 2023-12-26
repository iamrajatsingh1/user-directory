import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import UserDirectory from './containers/UserDirectory'
import UserDetail from './containers/UserDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={UserDirectory} />
        <Route path="/user/:id" Component={UserDetail} />
      </Routes>
    </Router>
  )
}

export default App
