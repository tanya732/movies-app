import React, { useEffect } from 'react'
import { useState } from 'react'
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import axios from 'axios';

const Movies = () => {
    const [pageNo, setPageNo] = useState(1)
    const [movies, setMovies] = useState([
    {
        url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        title: "The Shawshank Redemption",
    },
    {
        url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        title: "The Godfather",
    },
    {
        url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        title: "The Dark Knight",
    },
    {
        url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        title: "The Godfather: Part II",
    },
    {
        url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        title: "The Lord of the Rings: The Return of the King",
    }
    ]);

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

    console.log(watchlist)

    useEffect(() => {
        axios.get(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=557d559bf5871701433793f085ca6998&language=en-US&page=${pageNo}`
        ).then((response) => {
            console.log(response)
            setMovies(response.data.results)
        }).catch((error) => {
            console.error('Error fetching movie data: ', error)
        })
    }, [pageNo])

    useEffect(() => {
        const watchlist = localStorage.getItem("watchlist")
        if(watchlist) {
            setWatchlist(JSON.parse(watchlist))
        }
    }, [])

    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    const handlePrev = () => {
        if(pageNo > 1)
            setPageNo(pageNo - 1)
    }

  return (
    <div>
        <div className='text-2xl font-bold text-center m-5'>
            <h1>Trending Movies</h1>
        </div>
        <div className='flex justify-evenly flex-wrap gap-8'>
            {
                movies.map(movie => {
                    return (
                        <MovieCard movie={movie} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist} watchlist={watchlist}/>
                    )
                })
            }
        </div>
        <Pagination pageNo={pageNo} nextPageFn={handleNext} prevPageFn={handlePrev} />
    </div>
  )
}

export default Movies
