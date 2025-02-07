import React, { useContext, useEffect, useState } from 'react'
import {MovieContext} from '../context/MovieContext'

const Watchlist = () => {
  const {watchlist, setWatchlist} = useContext(MovieContext)
  const [search, setSearch] = useState('')
  const [currentGenre, setCurrentGenre] = useState("All")
  const [genreList, setGenreList] = useState(["All"])

  // console.log("Showing Watchlist in watchlist")
  // console.log(watchlist)

  const genreMapping = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const getGenre = (genreIds) => {
    const genre = []
    for(let i=0;i<genreIds.length;i++){
      
      genre.push(genreMapping[genreIds[i]])
      
    }
    return genre.join(", ")
  }

  const createGenreSet = () => {
    const genreSet = new Set();
    watchlist.forEach(movie => {
      movie.genre_ids.forEach(id => genreSet.add(genreMapping[id]))
    })
    return [...genreSet]
  }

  useEffect(() => {
    const watchlist = localStorage.getItem("watchlist")
    if(watchlist){
        setWatchlist(JSON.parse(watchlist))
    }
  }, []);

  useEffect(() => {
    console.log("genreList")
    const genres = createGenreSet();
    console.log(genres)
    setGenreList(["All", ...genres])
  }, [watchlist])

  const handleAscendingRatings = () => { 
    const sortAscending = watchlist.sort((a, b) => a.vote_average - b.vote_average)
    setWatchlist([...sortAscending])
  }

  const handleDescendingRatings = () => { 
    const sortDescending = watchlist.sort((a, b) => b.vote_average - a.vote_average)
    setWatchlist([...sortDescending])
  }

  console.log(currentGenre)

  return (
    <>
      <div className='flex justify-center m-4'>
        {
          genreList.map(genre => {
            return (
              <div className={
                currentGenre === genre ?
                'mx-4 flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4' :
                'flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4'
              }
              onClick={e => setCurrentGenre(genre)}
              >
                {genre}
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-center my-10'>
        <input 
          placeholder='search movies' 
          className='h-[3rem] w-[18rem] bg-gray-200 px-4 outline-none border-slate-600' 
          type='text' 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

      </div>
      <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
      <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
        <thead>
          <tr className='bg-gray-50'>
            <th className='px-6 py-4 font-medium text-gray-900'>
              Name
            </th>
            <th>
              <div className='flex'>
                <div>
                <i 
                  className='fa-solid fa-arrow-up'
                  onClick={handleDescendingRatings}
                ></i>{" "}
                  Rating
                {" "}<i 
                  className='fa-solid fa-arrow-down'
                  onClick={handleAscendingRatings}
                ></i>
                </div>
              </div>
            </th>
            <th>
              <div className='flex'>
                <div>Popularity</div>
              </div>
            </th>
            <th>
              <div className='flex'>
                <div>Genre</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100 border-t border-gray-100 '>
        {
          watchlist
          .filter(movie => {
            if(currentGenre === "All"){
              return true
            } else {
              return movie.genre_ids.some(id => genreMapping[id] === currentGenre)
            }
          })
          .filter(movie => {
            return movie.title.toLowerCase().includes(search.toLowerCase())
          })
          .map(movie => (
            <tr className='hover:bg-gray-50'>
              <td className='flex items-center px-6 py-4 font-normal text-gray-900'>
                <img className='h-[6rem] w-[10rem] object-fit' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt=""/>
                <div className='font-medium text-gray-700 text-sm m-4'>
                  {movie.title}
                </div>
              </td>
              <td className='pl-6 py-4'>{movie.vote_average}</td>
              <td className='pl-6 py-4'>{movie.popularity}</td>
              <td className='pl-6 py-4'>{getGenre(movie.genre_ids)}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Watchlist
