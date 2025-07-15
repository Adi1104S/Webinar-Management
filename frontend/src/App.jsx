import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Home = () => <div className="p-4 text-2xl">Welcome to Webinar Management</div>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
