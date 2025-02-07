import React, { useState, useEffect } from 'react'

export const MovieContext = React.createContext() 

const MovieContextWrapper = ({children}) => {

    const [watchlist, setWatchlist] = useState([])

    const addToWatchlist = (movie) => {
        console.log("I'm adding to watchlist")
        const updatedWatchlist = [...watchlist, movie]
        setWatchlist([...watchlist, movie])
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))
    }

    const removeFromWatchlist = (movie) => {
        console.log("I'm removing from watchlist")
        const updatedWatchlist = watchlist.filter(watchlistMovie => watchlistMovie.id !== movie.id)
        setWatchlist(updatedWatchlist)
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))
    }

    useEffect(() => {
            const watchlist = localStorage.getItem("watchlist")
            if(watchlist) {
                setWatchlist(JSON.parse(watchlist))
            }
        }, []);

  return <MovieContext.Provider value={{addToWatchlist, removeFromWatchlist, watchlist, setWatchlist}}>{children}</MovieContext.Provider>
}

export default MovieContextWrapper