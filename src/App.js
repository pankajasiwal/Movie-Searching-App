import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {


  let [movieinfo,setMovieinfo]=useState(null);
  let [title,setTitle]=useState("five feet apart")

  useEffect(()=>{
    getMovieData();
  },[])

  function readTitle(value){
    setTitle(value);
  }

  function getMovieData(){
    let url=`https://omdbapi.com/?t=${title}&apikey=3e45380e`;
    fetch(url)
    .then((response)=>response.json())
    .then((movie)=>{
      console.log(movie);
      setMovieinfo(movie);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  return (
    <div className="App">
     
      <div className="container">
        <div className="padd">
          <h1>Movie Search</h1>
          <div className="input-group">
            <input type="text" placeholder="Enter Movie Name" onChange={(event)=>readTitle(event.target.value)} className="search-field"/>
            <button className="btn" onClick={getMovieData}>Get Movie</button>
          </div>
          {
            movieinfo?.Error===undefined?(
              <div className="movie">
              <div className="poster">
                <img src={movieinfo?.Poster} className="img-poster" />
              </div>
              <div className="details">
                  <div className="padd">
                    <h1>{movieinfo?.Title}</h1>
                    <p> <strong>Genre</strong> : {movieinfo?.Genre}</p>
                    <p> <strong>Director</strong> : {movieinfo?.Director}</p>
                    <p> <strong>Plot</strong> : {movieinfo?.Plot}</p>
                    <p> <strong>Actors</strong> : {movieinfo?.Actors}</p>
                    <p> <strong>BoxOffice</strong> : {movieinfo?.BoxOffice}</p>
                    <p> <strong>Language</strong> : {movieinfo?.Language}</p>
                    <p> <strong>Released</strong> : {movieinfo?.Released}</p>
                    <p> <strong>Runtime</strong> : {movieinfo?.Runtime}</p>

                    <div className="rating">
                      {
                        movieinfo?.Ratings.map((rating)=>(
                          <div className="p">
                            <strong>{rating.Source}</strong>
                            <h2>{rating.Value}</h2>
                          </div>
                        ))
                      }
                    </div>
                  </div>
              </div>
          </div>
            ):
            (
              <h1>Movie Not Found!!</h1>
            )
          }
        </div>
      </div>


    </div>
  );
}

export default App;
