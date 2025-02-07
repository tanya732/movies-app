import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    // to wrap around all elements into individual one
    <div className='flex space-x-8 items-center '>
     {/* Link to route */}
        <Link 
            className='text-blue-500 text-3xl font-bold '
            to='/'>Movies</Link>
        <Link 
            className='text-blue-500 text-3xl font-bold '
            to='/watchlist'>Watchlist</Link>
    </div>
  )
}

export default Navbar
