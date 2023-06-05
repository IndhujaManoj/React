import React, { useState } from 'react'

const Card = (movie) => {
    const [select,setSelect]=useState([])
    // console.log(movie.info)
    let img_path="https://image.tmdb.org/t/p/w500";
    
    console.log(select)

    function cart(){
        setSelect(movie.info.title)
        // console.log(movie.info.title)
    }
    return (
        <>
            <div className='movie'>
                <img src={img_path+movie.info.poster_path} className='poster' onClick={cart}/>
                <div className='movie-details'>
                    <div className='box'>
                        <h4 className='title'>{movie.info.title}</h4>
                        <p className='rating'>{movie.info.vote_average}</p>
                    </div>
                    <div className='overview'>
                        <h1>Overview</h1>
                       {movie.info.overview}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card