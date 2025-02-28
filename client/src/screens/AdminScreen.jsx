import React from 'react'
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
import Dashboard from '../components/AdminDashboard/Dashboard'

function AdminScreen() {
  return (
    <div>
        <Nav/>
        <Dashboard/>
        <Footer/>
    </div>
  )
}

export default AdminScreen