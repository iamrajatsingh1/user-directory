import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserDirectory from './containers/UserDirectory'
import UserDetail from './containers/UserDetail'
import { CacheProvider } from './context/CacheContext'
import './App.css'

function App() {
  return (
    <Router>
      <CacheProvider>
        <Routes>
          <Route path="/" exact Component={UserDirectory} />
          <Route path="/user/:id" Component={UserDetail} />
        </Routes>
      </CacheProvider>
    </Router>
  )
}

export default App
