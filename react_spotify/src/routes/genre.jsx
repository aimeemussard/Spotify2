import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../navbar";

export default function Genreslisting(){
    const [genres, setGenres] = useState([]);
    const location = useLocation();
  
    const fetchData = () => {
      return fetch("http://localhost:8000/genres")
            .then((response) => response.json())
            .then((data) => setGenres(data));
    }
    useEffect(() => {
      fetchData();
    }, [location.pathname])
  
    return (
      <>
        <Navbar/>
        <main>
          <h1 className="genre-heading">Choisir un genre :</h1>
          <div className="genre-container">
            {genres && genres.length > 0 && genres.map((genresObj, index) => (
              <div key={"div-"+ index} >
                <Link to={`/genres/` + genresObj.id} type="button" id={genresObj.id} className="genre-button">{genresObj.name}</Link>
              </div>
              ))}
          </div>
        </main>
      </>
      
    );
      
  }