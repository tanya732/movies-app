import React from 'react'
import Watchlist from './Watchlist'

const MovieCard = ({movie, addToWatchlist, removeFromWatchlist, watchlist}) => {

  const isAddedToWatchlist = (movie) => {
    //console.log(watchlistMovie.id, movie.id)
    for(let i=0;i<watchlist.length;i++){
      if(watchlist[i].id === movie.id){
        return true
      }
    }
    return false
}

  return (
    <div
        className='h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110
        duration-300 hover:cursor-pointer flex flex-col justify-between items-end'
        style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
    >
    {
      isAddedToWatchlist(movie) ? (
        <div 
          onClick={() => removeFromWatchlist(movie)}
          className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60'>
            ❌
        </div>
      ) : (
        <div 
          onClick={() => addToWatchlist(movie)}
          className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60'>
            ❤️
        </div>
      )
    }
  
    <div className='text-white w-full text-center text-l p-2 bg-gray-900'>
        {movie.title}
    </div>
    </div>
  )
}

export default MovieCard
