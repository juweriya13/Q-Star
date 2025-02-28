import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [dataset, setDataset] = useState(null)

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage setDataset={setDataset} />} />
            <Route path="/dashboard" element={<Dashboard dataset={dataset} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App