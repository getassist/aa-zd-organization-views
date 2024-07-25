import React, { useEffect, useState } from 'react'
import TicketSidebar from './locations/TicketSidebar'
import './App.css'
import Client from './providers/Client'
import NavBar from './locations/NavBar'

const App = () => {
    const [location, setLocation] = useState(null)

    useEffect(() => {
      const getData = async () => {
        const context = await Client.context()
        setLocation(context.location)
      }
      getData()
    }, [])

    if (location === 'ticket_sidebar') {
        return (<TicketSidebar />)
    } else if (location === 'nav_bar') {
        return (<NavBar />)
    } else { return null }
}

export default App
