import React, { useEffect, useState } from 'react'
import Card from './Card'

let API_key = "&api_key=db95773a7fb212ba790d71f6adac0e7e";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedie"];
const Main = () => {
  const [MovieData, setMovieData] = useState([])
  const [url_set, setUrl] = useState(url)
  const [search,setSearch]=useState()
  useEffect(() => {
    fetch(url_set).then(res => res.json()).then(data => {
      // console.log(data.results)
      setMovieData(data.results)
    })
  }, [url_set])
  const getData = (movieType) => {
    if (movieType === 'Popular') {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
    }
    if (movieType === 'Theater') {
      url = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
    }
    if (movieType === "Kids") {
      url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_key;
    }
    if (movieType === "Drama") {
      url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
    }
    if (movieType === "Comedie") {
      url = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_key;
    }
    setUrl(url);

  }
const searchMovie=(evt)=>{
  if(evt.key==='Enter'){
    url=base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
    setUrl(url)
    setSearch(" ");
  }
}

function cartFun(){

}
  return (
    <>
      <div className='header'>
        <nav>
          <ul>
            {
              arr.map((value) => {
                return (
                  <li><a href='#' name={value} onClick={(e) => { getData(e.target.name) }}>{value}</a></li>
                )
              })
            }
          </ul>
        </nav>
        <form>
          <div className='search-btn'>
            <input type='text' placeholder='Enter Movie Name' className='inputText' onChange={(e)=>{setSearch(e.target.value)}} value={search} onKeyUp={searchMovie}></input>
            <button><i class="fas fa-search" ></i></button>
            <button onClick={cartFun}>cart</button>
          </div>
        
        </form>
      </div>
      <div className='container'>
        {
          (MovieData.length === 0) ? <p className='notfound'>Not Found</p> : MovieData.map((res, pos) => {
            return (
              <Card info={res} key={pos} />
            )
          })
        }
      </div>
    </>
  )
}

export default Main
