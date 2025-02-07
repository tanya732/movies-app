import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Banner = () => {

    const [bannerImage, setBannerImage] = useState('https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68')
    const [title, setTitle] = useState('Placeholder Movie')

    useEffect(() => { 
        // Fetch the movie data
        axios.get(
            'https://api.themoviedb.org/3/trending/movie/day?api_key=557d559bf5871701433793f085ca6998&language=en-US&page=1'
        ).then((response) => {
            // Update the bannerImage and title
            console.log(response)
            setBannerImage(`https://image.tmdb.org/t/p/original${response.data.results[1].backdrop_path}`)
            setTitle(response.data.results[1].title)
        }).catch((error) => {
            console.error('Error fetching movie data: ', error)
        })  
    }, [])

  return (
    <div
      className='h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end'
      style={{
        backgroundImage: `url(${bannerImage})`
      }}
    >

      <div className='text-white w-full text-center text-2xl'>
        {title}
      </div>
    </div>
  )
}

export default Banner
