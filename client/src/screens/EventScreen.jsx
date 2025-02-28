import React from 'react'
import Nav from '../components/Navbar'
import EventsTab from '../components/Event/EventsTab'
import Footer from '../components/Footer'

function EventScreen() {
  return (
    <div>
        <Nav/>
        <EventsTab/>
        <div className='h-36'></div>
        <Footer/>
    </div>
  )
}

export default EventScreen